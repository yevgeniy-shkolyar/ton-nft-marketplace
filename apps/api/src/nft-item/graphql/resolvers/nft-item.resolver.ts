import { Args, Parent, ID, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountType } from '../../../account/graphql/types/account.type';
import { AddressType } from '../../../address/graphql/types/address.type';
import { Resolution } from '../enum/address-format.enum';
import { NftItemType } from '../types/nft-item.type';

@Resolver(() => NftItemType)
export class NftItemResolver {
    @ResolveField(() => ID, { name: 'id' })
    getId(@Parent() { tonNftItem: { address } }: NftItemType): string {
        return address.toString();
    }

    @ResolveField(() => AddressType, { name: 'address' })
    getAddress(
        @Parent() { tonNftItem: { address } }: NftItemType,
    ): AddressType {
        return { address };
    }

    @ResolveField(() => AccountType, { name: 'owner', nullable: true })
    getOwner(
        @Parent() { tonNftItem: { owner } }: NftItemType,
    ): AccountType | undefined {
        return owner && { account: owner };
    }

    @ResolveField(() => String, { name: 'name', nullable: true })
    getName(
        @Parent() { tonNftItem: { collection } }: NftItemType,
    ): string | undefined {
        return collection?.name;
    }

    @ResolveField(() => String, { name: 'description', nullable: true })
    getDescription(
        @Parent() { tonNftItem: { collection } }: NftItemType,
    ): string | undefined {
        return collection?.description;
    }

    @ResolveField(() => String, { name: 'preview', nullable: true })
    getPreview(
        @Parent() { tonNftItem: { previews } }: NftItemType,
        @Args('resolution', {
            nullable: true,
            type: () => Resolution,
        })
        resolution: Resolution,
    ): string | undefined {
        if (previews === undefined) {
            return undefined;
        }
        switch (resolution) {
            case Resolution.X5: {
                return previews.find(preview => preview.resolution === '5x5')
                    ?.url;
            }
            case Resolution.X100: {
                return previews.find(
                    preview => preview.resolution === '100x100',
                )?.url;
            }
            case Resolution.X500: {
                return previews.find(
                    preview => preview.resolution === '500x500',
                )?.url;
            }
            case Resolution.X1500: {
                return previews.find(
                    preview => preview.resolution === '1500x1500',
                )?.url;
            }
        }
    }
}
