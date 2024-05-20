import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity.';
import { FileManagerController } from './filemanager.controller';
import { FileManagerService } from './filemanager.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
