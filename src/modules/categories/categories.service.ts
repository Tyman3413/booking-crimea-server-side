import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create.category.dto';
import { HotelCategory } from './hotel.category.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(addedCategory: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = addedCategory.name;
    category.type = HotelCategory.OTHER;

    return await this.repository.save(category);
  }

  async isNameExist(name: string): Promise<boolean> {
    const category = await this.repository.findOneBy({ name: name });
    return !!category;
  }

  async findAll(name?: string): Promise<Category[]> {
    return await this.repository.find({
      where: name ? { name: ILike(`${name}%`) } : {},
    });
  }

  async findOneById(id: number): Promise<Category> {
    return await this.repository.findOneBy({ id: id });
  }

  async deleteById(id: number): Promise<Category> {
    const category = await this.findOneById(id);
    if (category) {
      return await category.remove();
    }
  }
}
