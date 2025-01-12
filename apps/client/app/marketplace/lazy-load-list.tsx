'use client';

import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef } from 'react';

import { NftCard } from '@/components/nft-card';
import NftImage from '@/components/nft-image';
import Spinner from '@/components/spinner';
import { NftItemsDocument } from '@/graphql/generated/types';
import { useInfiniteScroll } from '@/hooks/use-infinite-query';

export default function LazyLoadList({
    cursor,
    limit,
}: {
    cursor?: string | null;
    limit: number;
}) {
    const cursorRef = useRef<string | undefined | null>(cursor);

    const [fetch, { data, fetchMore }] = useLazyQuery(NftItemsDocument);

    useEffect(() => {
        if (cursorRef.current) {
            fetch({
                variables: {
                    query: {
                        limit,
                        cursor,
                    },
                },
            });
        }
    }, [fetch]);

    useEffect(() => {
        if (data) {
            cursorRef.current = data.nftItems.pageInfo.endCursor;
        }
    }, [data]);

    const load = useCallback(() => {
        if (cursorRef.current) {
            fetchMore({
                variables: {
                    query: {
                        limit,
                        cursor: cursorRef.current,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    return {
                        nftItems: {
                            ...fetchMoreResult.nftItems,
                            edges: [
                                ...prev.nftItems.edges,
                                ...fetchMoreResult.nftItems.edges,
                            ],
                        },
                    };
                },
            });
        }
    }, [fetchMore]);

    const callback = useCallback(
        debounce(() => load(), 600),
        [load],
    );

    const loadMoreRef = useInfiniteScroll(callback);

    const loading = Boolean(
        data === undefined ? cursor : data.nftItems.pageInfo.hasNextPage,
    );

    return (
        <>
            {data?.nftItems.edges.map(({ nftItem }, index) => (
                <NftCard key={index} {...nftItem}>
                    <NftImage src={nftItem.src} alt={nftItem.name} />
                </NftCard>
            ))}
            <div
                ref={loadMoreRef}
                className="my-8 w-full text-center text-2xl text-muted-foreground"
            >
                {loading ? (
                    <Spinner size={48} />
                ) : (
                    <h3>All NFT items are loaded.</h3>
                )}
            </div>
        </>
    );
}

export type LazyLoadListType = typeof LazyLoadList;
