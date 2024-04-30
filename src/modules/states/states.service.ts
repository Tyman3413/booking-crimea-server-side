import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly repository: Repository<State>,
  ) {}

  async create(state: State) {
    const existingState = await this.repository.findOne({
      where: { englishName: state.englishName },
    });
    if (!existingState) return await this.repository.save(state);
  }
}
