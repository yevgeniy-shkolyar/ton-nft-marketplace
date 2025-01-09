// import ApolloLayout from '@/graphql/apollo-layout';
import React, { PropsWithChildren } from 'react';

import { OneSkeleton } from '@/components/one-suspens';

export const metadata = {
    title: 'NFT Friendly Addresses',
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return (
        // <ApolloLayout>
        <React.Suspense fallback={<OneSkeleton />}>{children}</React.Suspense>
        // </ApolloLayout>
    );
}
