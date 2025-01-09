import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Config } from '../config/index';

import { TonService } from './ton.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: TonService,
            inject: [ConfigService],
            useFactory: (config: ConfigService<Config>) => {
                const { baseUrl, apiKey } = config.get('ton', { infer: true })!;
                return new TonService({ baseUrl, apiKey });
            },
        },
    ],
    exports: [TonService],
})
export class TonModule {}
