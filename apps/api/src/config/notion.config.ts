import { registerAs } from '@nestjs/config';
import { Static, Type } from '@sinclair/typebox';

import { createConfigValidator } from '../utils/create-config-validator';

const schema = Type.Object({
    appSecret: Type.String(),
    databaseId: Type.String(),
});

export type NotionConfigSchema = Static<typeof schema>;

const valdateAppConfig = createConfigValidator(schema);

export const notionConfig = registerAs('notion', (): NotionConfigSchema => {
    const values: Partial<NotionConfigSchema> = {
        appSecret: process.env.NOTION_APP_SECRET,
        databaseId: process.env.NOTION_DATABASE_ID,
    };

    return valdateAppConfig(values);
});
