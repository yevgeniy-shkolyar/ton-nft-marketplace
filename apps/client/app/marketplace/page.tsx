import React from 'react';

import LazyLoadList from './lazy-load-list';

import { NftCard } from '@/components/nft-card';
import { NftImage } from '@/components/nft-image';
import { NftItemsDocument } from '@/graphql/generated/types';
import { graphqlRequestClient } from '@/graphql/graphql-request-client';
import Welcome from './welcome';

export const revalidate = 10;

const PAGE_SIZE = 5;

export default async function Page() {
    const {
        nftItems: {
            edges,
            pageInfo: { endCursor },
        },
    } = await graphqlRequestClient.request({
        document: NftItemsDocument,
        variables: {
            query: {
                limit: PAGE_SIZE,
            },
        },
    });

    return (
        <div className="flex h-full flex-col items-center justify-start overflow-y-auto">
            <Welcome />
            <div className="mb-8 flex max-w-full flex-row flex-wrap content-start items-start justify-center px-4 sm:px-8 md:justify-center lg:w-11/12  xl:w-10/12 2xl:w-8/12">
                {edges.map(({ nftItem, cursor }) => (
                    <NftCard key={cursor} {...nftItem}>
                        <NftImage src={nftItem.src} alt={nftItem.name} />
                    </NftCard>
                ))}
                <LazyLoadList cursor={endCursor} limit={PAGE_SIZE} />
            </div>
        </div>
    );
}
