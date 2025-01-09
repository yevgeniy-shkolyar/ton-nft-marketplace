import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    debug: Type.Boolean(),
    generateSchema: Type.Boolean(),
    introspection: Type.Boolean(),
    playground: Type.Boolean(),
});

export type GraphqlConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const graphqlConfig = registerAs('graphql', (): GraphqlConfigSchema => {
    const values: Partial<GraphqlConfigSchema> = {
        debug: process.env.GRAPHQL_DEBUG === 'true',
        generateSchema: process.env.GRAPHQL_GENERATE_SCHEMA === 'true',
        introspection: process.env.GRAPHQL_INTROSPECTION === 'true',
        playground: process.env.GRAPHQL_PLAYGROUND === 'true',
    };

    return valdateAppConfig(values);
});
