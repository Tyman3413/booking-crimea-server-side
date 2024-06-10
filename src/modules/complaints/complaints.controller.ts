import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@ApiTags('Жалобы 😒')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  // TODO
}
