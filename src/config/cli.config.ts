import { registerAs } from '@nestjs/config';

export const cliConfig = registerAs('cli', () => ({}));
