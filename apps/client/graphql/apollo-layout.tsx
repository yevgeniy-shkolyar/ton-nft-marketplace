import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from 'next-runtime-env';
import * as React from 'react';
import { Suspense, type PropsWithChildren } from 'react';

import { ApolloWrapper } from './apollo-wrapper';

export const metadata = {
    title: 'Team Bot',
};

export default function ApolloLayout({
    children,
}: Readonly<PropsWithChildren>) {
    const token = cookies().get('authorization')?.value;
    const uri = env('NEXT_PUBLIC_GRAPHQL_URI') ?? '/graphql';

    if (!token) {
        redirect('/auth/login');
    }
    return (
        <ApolloWrapper token={token} uri={uri}>
            <Suspense>{children}</Suspense>
        </ApolloWrapper>
    );
}
