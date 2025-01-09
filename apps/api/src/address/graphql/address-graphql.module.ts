import { Module } from '@nestjs/common';

import { AddressResolver } from './resolvers/address.resolver';

@Module({
    imports: [],
    providers: [AddressResolver],
})
export class AddressGraphqlModule {}
