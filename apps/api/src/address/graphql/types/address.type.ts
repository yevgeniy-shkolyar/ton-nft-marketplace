import { ObjectType } from '@nestjs/graphql';
import { Address } from '@ton/core';

@ObjectType('Address')
export class AddressType {
    address!: Address;
}
