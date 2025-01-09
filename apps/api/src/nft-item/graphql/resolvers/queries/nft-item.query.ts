import { Args, Query, Resolver, Root } from '@nestjs/graphql';

import { NftItemService } from '../../../nft-item.service';
import { CursorPaginationInput } from '../../inputs/cursor-pagination.input';
import { NftItemConnectionType } from '../../types/nft-item-connection.type';

@Resolver(() => Root)
export class NFTAddresssQuery {
    constructor(private readonly nftItemService: NftItemService) {}

    @Query(() => NftItemConnectionType, { name: 'nftItems' })
    async findNftItems(
        @Args('query')
        cursorPagination: CursorPaginationInput,
    ): Promise<NftItemConnectionType> {
        const result = await this.nftItemService.list(cursorPagination);

        return {
            ...result,
            edges: result.edges.map(edge => ({
                ...edge,
                nftItem: {
                    tonNftItem: edge.nftItem,
                },
            })),
        };
    }
}
