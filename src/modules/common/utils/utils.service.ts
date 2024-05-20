import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UtilsService {
  public static base64ToString(base64: string): string {
    if (base64) {
      return Buffer.from(base64, 'base64').toString();
    }
  }

  public static differenceInDays(checkIn: Date, checkOut: Date): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return timeDifference / (1000 * 3600 * 24);
  }
}
