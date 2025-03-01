import { v4 as uuid } from 'uuid';

export class CreateProductDto {

productid: string;
productName: string;
price: number;
countseal: number;
provider: string;

}
