import { Module } from '@nestjs/common';

import { AccountResolver } from './resolvers/account.resolver';

@Module({
    imports: [],
    providers: [AccountResolver],
})
export class AccountGraphqlModule {}
