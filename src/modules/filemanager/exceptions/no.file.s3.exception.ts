import { HttpException, HttpStatus } from '@nestjs/common';

export class NoFileS3Exception extends HttpException {
  constructor(message: string) {
    super(
      `В данный момент вызываемый метод не отвечает. Попробуйте позже`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
