import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './create.category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(addedCategory: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = addedCategory.name;
    category.type = addedCategory.type;

    return await this.repository.save(category);
  }

  async isNameExist(name: string): Promise<boolean> {
    const category = await this.repository.findOneBy({ name: name });

    return !!category;
  }

  async getAll(): Promise<Category[]> {
    return this.repository.find();
  }
}
