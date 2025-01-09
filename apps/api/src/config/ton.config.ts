import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    baseUrl: Type.String(),
    apiKey: Type.String(),
});

export type TonConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const tonConfig = registerAs('ton', (): TonConfigSchema => {
    const values: Partial<TonConfigSchema> = {
        baseUrl: process.env.TON_BASE_URL,
        apiKey: process.env.TON_API_KEY,
    };

    return valdateAppConfig(values);
});
