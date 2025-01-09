import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    port: Type.Number(),
});

export type AppConfigSchema = Static<typeof schema>;

const valdateTeamApiConfig = createConfigValidator(schema);

export const appConfig = registerAs('app', (): AppConfigSchema => {
    const values = {
        port: process.env.PORT ? Number(process.env.PORT) : 3000,
    };

    return valdateTeamApiConfig(values);
});
