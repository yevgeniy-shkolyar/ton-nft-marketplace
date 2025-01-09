import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Request } from 'express';

import { AccountGraphqlModule } from '../account/graphql/account-graphql.module';
import { AddressGraphqlModule } from '../address/graphql/address-graphql.module';
import { Config } from '../config';
import { appConfig } from '../config/app.config';
import { graphqlConfig } from '../config/graphql.config';
import { loggerConfig } from '../config/logger.config';
import { notionConfig } from '../config/notion.config';
import { tonConfig } from '../config/ton.config';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { NftItemGraphqlModule } from '../nft-item/graphql/nft-item-graphql.module';
import { NotionModule } from '../notion/notion.module';

@Module({
    imports: [
        LoggerModule,
        NotionModule,
        NftItemGraphqlModule,
        AccountGraphqlModule,
        AddressGraphqlModule,
        // AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '../../.env.secrets.decrypted'],
            load: [
                appConfig,
                loggerConfig,
                graphqlConfig,
                notionConfig,
                tonConfig,
            ],
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule, LoggerModule],
            inject: [ConfigService, LoggerService],
            useFactory: (config: ConfigService<Config>) => {
                const { playground, debug, generateSchema, introspection } =
                    config.get('graphql', {
                        infer: true,
                    })!;
                return {
                    plugins: playground
                        ? [
                              ApolloServerPluginLandingPageLocalDefault({
                                  includeCookies: true,
                                  embed: {
                                      runTelemetry: false,
                                  },
                              }),
                          ]
                        : [],
                    context: ({ req: request }: { req: Request }) => ({
                        request,
                    }),
                    debug,
                    driver: ApolloDriver,
                    sortSchema: true,
                    useGlobalPrefix: true,
                    introspection,
                    playground: false,
                    autoSchemaFile: generateSchema
                        ? 'graphql-schema.gql'
                        : true,
                };
            },
        }),
    ],
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useExisting: AuthGuard,
    //     },
    // ],
})
export class TeamApiModule {}
