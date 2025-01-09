import { ApolloServerPlugin } from '@apollo/server';

import { GraphqlContext } from '../app/app-context';

import { LoggerService } from './logger.service';

export const loggerPlugin = (loggerService: LoggerService) =>
    function (): ApolloServerPlugin<GraphqlContext> {
        return {
            requestDidStart: async requestContext => {
                const {
                    request: { operationName, variables },
                } = requestContext;

                loggerService.debug(`graphql request`);
                loggerService.debug(
                    JSON.stringify({ operationName, variables }),
                );

                return {
                    didEncounterErrors: async ({ errors }) => {
                        for (const error of errors) {
                            loggerService.error(error);
                        }
                    },
                };
            },
        };
    };
