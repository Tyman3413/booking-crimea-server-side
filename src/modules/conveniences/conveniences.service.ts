import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenience } from './convenience.entity';
import { In, Repository } from 'typeorm';
import { UserPayload } from '../auth/dto/user.payload';

@Injectable()
export class ConveniencesService {
  constructor(
    @InjectRepository(Convenience)
    private readonly repository: Repository<Convenience>,
  ) {}

  async findAll(user: UserPayload) {
    return await this.repository.find();
  }

  async findAllByIds(ids: number[]) {
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }

  async create(convenience: Convenience): Promise<Convenience> {
    return await this.repository.save(convenience);
  }
}
