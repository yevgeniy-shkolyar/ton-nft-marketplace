import { Module } from '@nestjs/common';

import { MeQuery } from './resolvers/queries/me.query';
import { UserResolver } from './resolvers/user.resolver';

@Module({
    imports: [],
    providers: [UserResolver, MeQuery],
})
export class UserGraphqlModule {}
