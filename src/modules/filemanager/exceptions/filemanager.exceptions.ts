import { HttpException, HttpStatus } from '@nestjs/common';

export class FileErrorOccurredException extends HttpException {
  constructor() {
    super('Произошла ошибка сохранения файла', HttpStatus.BAD_REQUEST);
  }
}
