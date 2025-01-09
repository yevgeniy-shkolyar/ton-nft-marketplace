import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Address } from '@ton/core';
import { NftItem } from '@ton-api/client';
import { Cache } from 'cache-manager';
import ms from 'ms';

import { Config } from '../config';
import { NotionService } from '../notion/notion.service';
import { TonService } from '../ton/ton.service';

import {
    NotionResponse,
    notionResponseValidator,
} from './notion-response.schema';

interface Page {
    pageInfo: {
        hasNextPage: boolean;
        endCursor: string | undefined;
    };
    edges: {
        cursor: string;
        nftItem: NftItem;
    }[];
}

@Injectable()
export class NftItemService {
    databaseId: string;
    constructor(
        config: ConfigService<Config>,
        private readonly notion: NotionService,
        private readonly ton: TonService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
        const { databaseId } = config.get('notion', { infer: true })!;
        this.databaseId = databaseId;
    }

    async list({
        cursor,
        limit,
    }: {
        cursor?: string;
        limit: number;
    }): Promise<Page> {
        return this.cacheManager.wrap<Page>(
            this.generateCacheKey({ cursor, limit }),

            async (): Promise<Page> => {
                const notionItems = await this.findNotionItem({
                    cursor,
                    limit,
                });

                return this.loadNftItem(notionItems);
            },
            ms('10m'),
        );
    }

    private async findNotionItem({
        cursor,
        limit,
    }: {
        cursor?: string;
        limit: number;
    }): Promise<NotionResponse> {
        const page = await this.notion.databases.query({
            database_id: this.databaseId,
            start_cursor: cursor,
            page_size: limit,
        });

        if (notionResponseValidator.Check(page)) {
            return page;
        }

        console.error(notionResponseValidator.Errors(page).First());
        throw new Error('Notion response validation failed');
    }

    private async loadNftItem(page: NotionResponse): Promise<Page> {
        const nftItems = page.results.map(result => ({
            address:
                result.properties['NFT Friendly Address'].title[0].text.content,
        }));

        const { nftItems: nftItemsResponse } =
            await this.ton.nft.getNftItemsByAddresses({
                accountIds: nftItems.map(nftItem =>
                    Address.parse(nftItem.address),
                ),
            });

        const nftItemMap = new Map(
            nftItemsResponse.map(nftItem => [
                nftItem.address.toString(),
                nftItem,
            ]),
        );

        return {
            pageInfo: {
                hasNextPage: page.has_more,
                endCursor: page.next_cursor ?? undefined,
            },
            edges: page.results.map(result => {
                return {
                    cursor: result.id,
                    nftItem: nftItemMap.get(
                        result.properties['NFT Friendly Address'].title[0].text
                            .content,
                    )!,
                };
            }),
        };
    }

    private generateCacheKey({
        cursor,
        limit,
    }: {
        cursor?: string;
        limit: number;
    }): string {
        return `nft-items:${cursor ?? 'null'}:${String(limit)}`;
    }
}
