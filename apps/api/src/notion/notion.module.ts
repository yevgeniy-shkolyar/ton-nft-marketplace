import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Config } from '../config/index';

import { NotionService } from './notion.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: NotionService,
            inject: [ConfigService],
            useFactory: (config: ConfigService<Config>) => {
                const { appSecret } = config.get('notion', { infer: true })!;
                return new NotionService(appSecret);
            },
        },
    ],
    exports: [NotionService],
})
export class NotionModule {}
