import React, { PropsWithChildren } from 'react';

import CopyInlineTextBlock from './ui/copy-inline-text-block';

import { NftItemFragmentFragment } from '@/graphql/generated/types';

export const NftCard = ({
    name,
    children,
    description,
    address,
    owner,
    ...props
}: PropsWithChildren & NftItemFragmentFragment) => {
    return (
        <div className="w-full max-w-[500px] p-4 md:max-w-screen-lg" {...props}>
            <div className="flex w-full flex-col overflow-auto rounded-2xl border-0 bg-card shadow-xs md:flex-row">
                <div className="m-0 px-0 pt-0 ">
                    <div className="aspect-square overflow-hidden bg-slate-500 md:w-48 lg:w-64">
                        {children}
                    </div>
                </div>
                <div className="space-y-1 p-6 text-sm text-card-foreground overflow-y-hidden">
                    <div className="text-2xl leading-none">{name}</div>
                    <div className="py-4 text-justify leading-tight">
                        {description}
                    </div>
                    <CopyInlineTextBlock
                        title="Friendly address"
                        value={address.frienlyFormat}
                    />
                    <CopyInlineTextBlock
                        title="Raw address"
                        value={address.rawFormat}
                    />
                    <CopyInlineTextBlock
                        title="Owner"
                        value={owner?.address.frienlyFormat}
                    />
                </div>
            </div>
        </div>
    );
};

export default NftCard;
