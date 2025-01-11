import { Context, ResolveField, Resolver } from '@nestjs/graphql';

import { GraphqlContext } from '../../../app/app-context';
import { UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {
    @ResolveField(() => String, { name: 'random' })
    getRandom(): string {
        // eslint-disable-next-line sonarjs/pseudo-random
        const rnd = Math.random().toString(32).slice(2);
        console.log({ rnd });
        return rnd;
    }

    @ResolveField(() => String, { name: 'id', nullable: true })
    getId(@Context() { user }: GraphqlContext): string | undefined {
        return user?.id;
    }
}
