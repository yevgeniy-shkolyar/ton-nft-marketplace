import { Field, ID, ObjectType } from '@nestjs/graphql';

import { NftItemType } from './nft-item.type';

@ObjectType('NftItemEdge')
export class NftItemEdgeType {
    @Field(() => NftItemType, {
        nullable: false,
        description: 'Description for the NFT item.',
    })
    nftItem!: NftItemType;

    @Field(() => ID, { description: 'Description for the cursor.' })
    cursor!: string;
}
