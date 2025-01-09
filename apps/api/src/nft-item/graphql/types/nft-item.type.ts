import { ObjectType } from '@nestjs/graphql';
import { NftItem } from '@ton-api/client';

@ObjectType('NftItem')
export class NftItemType {
    tonNftItem!: NftItem;
}
