import { HttpException, HttpStatus } from '@nestjs/common';

export class MultipleLimitFileException extends HttpException {
  constructor() {
    super('Превышено разрешенное количество файлов', HttpStatus.BAD_REQUEST);
  }
}
