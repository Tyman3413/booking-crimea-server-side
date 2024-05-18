import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UtilsService {
  public static base64ToString(base64: string): string {
    if (base64) {
      return Buffer.from(base64, 'base64').toString();
    }
  }
}
