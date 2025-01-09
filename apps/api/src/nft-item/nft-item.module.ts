import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '../logger/logger.module';
import { NotionModule } from '../notion/notion.module';
import { TonModule } from '../ton/ton.module';

import { NftItemService } from './nft-item.service';

@Module({
    imports: [
        LoggerModule,
        TonModule,
        ConfigModule,
        NotionModule,
        CacheModule.register(),
    ],
    providers: [NftItemService],
    exports: [NftItemService],
})
export class NftItemModule {}
