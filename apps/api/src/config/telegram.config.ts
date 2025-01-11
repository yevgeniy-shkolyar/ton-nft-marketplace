import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    token: Type.String(),
});

export type TelegramConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const telegramConfig = registerAs(
    'telegram',
    (): TelegramConfigSchema => {
        const values: Partial<TelegramConfigSchema> = {
            token: process.env.TELEGRAM_TOKEN,
        };

        return valdateAppConfig(values);
    },
);
