import React, { PropsWithChildren } from 'react';

import ApolloLayout from '@/graphql/apollo-layout';

export const metadata = {
    title: 'TON NFT Marketplace',
    description:
        'A decentralized marketplace for unique digital assets on the TON blockchain.',
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return <ApolloLayout>{children}</ApolloLayout>;
}
