import React, { PropsWithChildren } from 'react';

import { Card, CardHeader, CardFooter } from './ui/card';

interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string | null;
    description?: string | null;
    src?: string | null;
    width?: number;
    height?: number;
}

export const NftCard = ({
    name,
    children,
    ...props
}: NftCardProps & PropsWithChildren) => {
    return (
        <div
            className="p-4 w-full max-w-[500px] sm:p-8 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4"
            {...props}
        >
            <Card className="w-full rounded-2xl border-0 shadow-xs">
                <CardHeader className="m-0 px-0 pt-0 ">
                    <div
                        className="overflow-hidden rounded-t-2xl bg-slate-500"
                        style={{ aspectRatio: '1 / 1' }}
                    >
                        {children}
                    </div>
                </CardHeader>
                <CardFooter className="space-y-1 text-sm">
                    <h3 className="font-medium leading-none">{name}</h3>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NftCard;
