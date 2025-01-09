import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AddressType } from '../../../address/graphql/types/address.type';
import { AccountType } from '../types/account.type';

@Resolver(() => AccountType)
export class AccountResolver {
    @ResolveField(() => AddressType, { name: 'address' })
    getAddress(@Parent() { account }: AccountType): AddressType {
        return { address: account.address };
    }
}
