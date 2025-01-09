import { ObjectType } from '@nestjs/graphql';
import { AccountAddress } from '@ton-api/client';

@ObjectType('Account')
export class AccountType {
    account!: AccountAddress;
}
