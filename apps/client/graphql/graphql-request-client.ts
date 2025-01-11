import { GraphQLClient } from 'graphql-request';
import { env } from 'next-runtime-env';

export const graphqlRequestClient = new GraphQLClient(
    env('NEXT_PUBLIC_GRAPHQL_URI') ?? '/graphql',
    {
        headers: {
            authorization: `bff ${env('API_SECRET')!}`,
        },
    },
);
