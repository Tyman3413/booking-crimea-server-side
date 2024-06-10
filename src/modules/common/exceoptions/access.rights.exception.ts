import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessRightsException extends HttpException {
  constructor() {
    super('Недостаточно прав доступа', HttpStatus.FORBIDDEN);
  }
}
