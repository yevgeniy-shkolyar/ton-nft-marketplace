import { AppConfigSchema } from './app.config';
import { GraphqlConfigSchema } from './graphql.config';
import { LoggerConfigSchema } from './logger.config';
import { NotionConfigSchema } from './notion.config';
import { TonConfigSchema } from './ton.config';

export interface Config {
    app: AppConfigSchema;
    logger: LoggerConfigSchema;
    graphql: GraphqlConfigSchema;
    notion: NotionConfigSchema;
    ton: TonConfigSchema;
}
