import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
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

  create(createProductDto: CreateProductDto) {
    createProductDto.productid = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.find((product) => product.productid === id);
    if (!productFound) throw new NotFoundException();
    return productFound;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.provider === id);
    if (productFound.length == 0) throw new NotFoundException();
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    product ={
      ...product,
        ...updateProductDto
    }
  }

  remove(id: string) {
    const { productid } = this.findOne(id); // ✅ Se mantiene la estructura, pero aseguramos que id es del mismo tipo que productid
    this.products = this.products.filter((product) => product.productid !== productid); // ✅ Se elimina el uso de "removeproduct", que no existía
    return this.products;
  }

}
