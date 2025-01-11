'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import * as React from 'react';

import { makeClient } from './apollo-client';

export function ApolloWrapper({
    children,
    uri,
    token,
}: React.PropsWithChildren<{ token: string; uri: string }>) {
    return (
        <ApolloNextAppProvider makeClient={makeClient(uri, token)}>
            {children}
        </ApolloNextAppProvider>
    );
}
