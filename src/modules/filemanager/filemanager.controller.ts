import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageAndDocumentsFileFilter } from './filemanager.utils';
import { memoryStorage } from 'multer';
import { FileDetailsDto } from './dto/file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FileManagerService } from './filemanager.service';

const configService = new ConfigService();

const UPLOAD_MAX_FILE_SIZE: number =
  1024 * 1024 * (+configService.get<string>('UPLOAD_MAX_FILE_SIZE_MB') || 6);
const UPLOAD_LIMIT_FILES: number =
  1024 * 1024 * (+configService.get<string>('UPLOAD_LIMIT_FILES') || 20);
const UPLOAD_DIRECTORY = './uploads';

@ApiTags('Файловый менеджер 📂')
@Controller('filemanager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      dest: './tmp',
      fileFilter: imageAndDocumentsFileFilter,
    }),
  )
  @Post('upload/file')
  async uploadedFileS3(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: UPLOAD_MAX_FILE_SIZE }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<FileDetailsDto> {
    return await this.fileManagerService.uploadFile(file);
  }

  @Get('s3/:key/download')
  async downloadFileS3(
    @Param('key') key: string,
    @Res() response,
  ): Promise<any> {
    const objectS3 = await this.fileManagerService.loadFileS3(key);

    response.set({
      'Content-Type': objectS3.ContentType,
      'Content-Disposition': `attachment; filename=example${key}`,
      'Content-Length': objectS3.Body.length,
    });

    response.end(objectS3.Body);
  }

  @Get('s3/:key')
  async urlFileS3(@Param('key') key: string, @Res() response): Promise<any> {
    const objectS3 = await this.fileManagerService.loadFileS3(key);

    response.set({
      'Content-Type': objectS3.ContentType,
      'Content-Disposition': `inline`,
      'Content-Length': objectS3.Body.length,
    });
    response.end(objectS3.Body);
  }
}
