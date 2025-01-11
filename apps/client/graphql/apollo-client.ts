import { HttpLink } from '@apollo/client/link/http/HttpLink';
import {
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

export const makeClient = (uri: string, token: string) => () => {
    const httpLink = new HttpLink({
        uri,
        ...(token
            ? {
                  headers: {
                      Authorization: token,
                  },
              }
            : {}),
        fetchOptions: { cache: 'no-store' },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
};
