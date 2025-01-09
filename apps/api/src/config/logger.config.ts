import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    level: Type.Union([
        Type.Literal('fatal'),
        Type.Literal('error'),
        Type.Literal('warn'),
        Type.Literal('info'),
        Type.Literal('debug'),
        Type.Literal('trace'),
    ]),
    format: Type.Union([Type.Literal('json'), Type.Literal('pretty')]),
});

export type LoggerConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const loggerConfig = registerAs('logger', (): LoggerConfigSchema => {
    const values = {
        level: process.env.LOGGER_LEVEL ?? 'debug',
        format: process.env.LOGGER_FORMAT ?? 'pretty',
    };

    return valdateAppConfig(values);
});
