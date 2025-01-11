import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    port: Type.Number(),
    secret: Type.String(),
});

export type AppConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const appConfig = registerAs('app', (): AppConfigSchema => {
    const values = {
        port: process.env.PORT ? Number(process.env.PORT) : 3000,
        secret: process.env.API_SECRET,
    };

    return valdateAppConfig(values);
});
