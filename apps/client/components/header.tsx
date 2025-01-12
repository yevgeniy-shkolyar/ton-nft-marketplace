'use client';

import React, { PropsWithChildren } from 'react';
import type { JSX } from 'react';

export const Header: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
    return (
        <div className="my-20 mx-4 text-center text-3xl md:text-5xl text-card-foreground font-light leading-normal tracking-wide">
            {children}
        </div>
    );
}
