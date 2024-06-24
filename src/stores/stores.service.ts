import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {

  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeRepository.save(createStoreDto);
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  findOne(id: number): Promise<Store | null> {
    return this.storeRepository.findOneBy({id});
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store | null> {

    try {

      const store = await this.findOne(id);

      if ( store.id == undefined) {
        throw new ForbiddenException();
      }

      await this.storeRepository.update(id, updateStoreDto);
      return store;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error updated store',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async remove(id: number) {
    await this.storeRepository.delete(id);
  }
}
