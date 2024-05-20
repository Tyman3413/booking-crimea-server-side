import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity.';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../auth/dto/user.payload';
import { FileDetailsDto, FileDetailsS3Dto } from './dto/file.dto';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { User } from '../users/user.entity';
import { S3Exception } from './exceptions/s3.exception';
import { NoFileS3Exception } from './exceptions/no.file.s3.exception';

const UPLOAD_DIRECTORY = './uploads';

@Injectable()
export class FileManagerService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly repository: Repository<FileEntity>,
    private readonly configService: ConfigService,
  ) {}

  S3_BUCKET = this.configService.get<string>('S3_BUCKET');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get<string>('S3_SECRET_KEY_ID'),
    region: this.configService.get<string>('S3_REGION'),
    endpoint: this.configService.get<string>('S3_ENDPOINT'),
    s3ForcePathStyle: true,
    sslEnabled: false,
  });

  async uploadFile(
    file,
    user: UserPayload = null,
    isPrivate: boolean = false,
  ): Promise<FileDetailsDto> {
    console.log(file);
    const { originalname } = file;
    const extension = originalname.substr(originalname.lastIndexOf('.')) || '';

    const partFilename = v4();
    const uploadS3 = await this.s3_upload(
      file.buffer,
      this.S3_BUCKET,
      `${partFilename}${extension}`,
      file.mimetype,
    );

    if (!uploadS3) throw new S3Exception();

    const fileDTO = new FileDetailsDto({
      originalName: originalname,
      fileName: `${partFilename}${extension}`,
      size: 0,
    });

    let userReturn = null;

    if (user) {
      userReturn = await User.findOne({ where: { id: user?.id } });
    }

    const repository = await FileEntity.init(
      userReturn,
      `${partFilename}${extension}`,
      fileDTO,
      uploadS3,
      isPrivate,
    );

    return repository.fileDTO;
  }

  async s3_upload(
    file,
    bucket,
    name,
    mimetype,
  ): Promise<FileDetailsS3Dto | any> {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      acl: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.get<string>('REGION'),
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async loadFileS3(key: string): Promise<any> {
    const params = { Bucket: this.S3_BUCKET, Key: key };
    try {
      return await this.s3.getObject(params).promise();
    } catch (e) {
      throw new NoFileS3Exception(e.message);
    }
  }
}
