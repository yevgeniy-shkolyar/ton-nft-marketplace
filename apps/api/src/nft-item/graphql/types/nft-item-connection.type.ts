import { Field, ObjectType } from '@nestjs/graphql';

import { NftItemEdgeType } from './nft-item-edge.type';
import { PageInfoType } from './page-info.type';

@ObjectType('NftItemConnection')
export class NftItemConnectionType {
    @Field(() => [NftItemEdgeType], {
        description: 'A list of edges.',
    })
    edges!: NftItemEdgeType[];

    @Field(() => PageInfoType, {
        description: 'Information to aid in pagination.',
    })
    pageInfo!: PageInfoType;
}
