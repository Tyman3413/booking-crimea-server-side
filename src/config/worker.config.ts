import { registerAs } from '@nestjs/config';

export const workerConfig = registerAs('worker', () => ({}));
