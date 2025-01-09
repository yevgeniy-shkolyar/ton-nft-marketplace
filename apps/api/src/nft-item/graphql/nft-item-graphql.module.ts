import { Module } from '@nestjs/common';

import { LoggerModule } from '../../logger/logger.module';
import { NftItemModule } from '../nft-item.module';

import { NftItemResolver } from './resolvers/nft-item.resolver';
import { NFTAddresssQuery } from './resolvers/queries/nft-item.query';

@Module({
    imports: [LoggerModule, NftItemModule, NftItemModule],
    providers: [NftItemResolver, NFTAddresssQuery],
})
export class NftItemGraphqlModule {}
