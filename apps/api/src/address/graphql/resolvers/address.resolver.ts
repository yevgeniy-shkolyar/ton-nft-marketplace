import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AddressType } from '../types/address.type';

@Resolver(() => AddressType)
export class AddressResolver {
    @ResolveField(() => String, { name: 'rawFormat', nullable: true })
    getRawFormat(@Parent() { address }: AddressType): string {
        return address.toRawString();
    }

    @ResolveField(() => String, { name: 'frienlyFormat', nullable: true })
    getFrienlyFormat(@Parent() { address }: AddressType): string {
        return address.toString();
    }
}
