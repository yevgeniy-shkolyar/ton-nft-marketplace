'use client';

import React, { PropsWithChildren } from 'react';
import type { JSX } from 'react';

export const Header: React.FC<PropsWithChildren> = ({
    children,
}): JSX.Element => {
    return (
        <div className="mx-4 my-20 text-center text-3xl font-light leading-normal tracking-wide text-card-foreground md:text-5xl">
            {children}
        </div>
    );
};
