import { Context, ResolveField, Resolver } from '@nestjs/graphql';

import { GraphqlContext } from '../../../app/app-context';
import { UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {
    @ResolveField(() => String, { name: 'id', nullable: true })
    getId(@Context() { user }: GraphqlContext): string | undefined {
        return user?.id;
    }

    @ResolveField(() => String, { name: 'name', nullable: true })
    getName(@Context() { user }: GraphqlContext): string | undefined {
        return user?.firstName ?? user?.username;
    }
}
