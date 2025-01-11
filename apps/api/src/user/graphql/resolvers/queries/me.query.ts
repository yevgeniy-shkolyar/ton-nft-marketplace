import { Query, Resolver, Root } from '@nestjs/graphql';

import { UserType } from '../../types/user.type';

@Resolver(() => Root)
export class MeQuery {
    @Query(() => UserType, { name: 'me' })
    getMe(): UserType {
        return {};
    }
}
