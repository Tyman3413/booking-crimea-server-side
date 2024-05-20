import { HttpException, HttpStatus } from '@nestjs/common';

export class S3Exception extends HttpException {
  constructor() {
    super('S3 errors. Contact your administrator', HttpStatus.BAD_REQUEST);
  }
}
