import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository  } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
                private productRepository: Repository<Product> ){}


  private products: CreateProductDto[] = [
    {
      productid: uuid(),
      productName: "sopa maruchan",
      price: 20,
      countseal: 3,
      provider: uuid(),
    },
    {
      productid: uuid(),
      productName: "papas adobadas",
      price: 10,
      countseal: 3,
      provider: uuid(),
    },
    {
      productid: uuid(),
      productName: "chocolate",
      price: 230,
      countseal: 3,
      provider: uuid(),
    }
  ];



 async create(createProductDto: CreateProductDto) {
   const product =  this.productRepository.create(createProductDto);{
     const saveProduct = this.productRepository.save(product);
     return product;
   }
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productid : id
    })
    if (!product) {throw new NotFoundException('Product not found');}
    return product;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.provider === id);
    if (productFound.length == 0) throw new NotFoundException();
    return productFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productid: id,
      ...updateProductDto
    });

    if (!productToUpdate) {
      throw new NotFoundException();
    }

    return await this.productRepository.save(productToUpdate);
  }


  remove (id: string) {
   return this.productRepository.delete({
     productid : id
    })
  }

}
