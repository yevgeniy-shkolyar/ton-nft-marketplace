'use client';

import { useQuery } from '@apollo/client';
import React from 'react';

import { MeDocument } from '@/graphql/generated/types';
import Spinner from '@/components/spinner';

export default function Final() {
    const { data } = useQuery(MeDocument);

    const message =  `Appreciate your visit${data?.me.name ? `, ${data.me.name}` : ''}! `;

    if (!data) {
        return (
            <div className="m-20 text-center">
                <Spinner size={48} />
            </div>
        );
    }
    return (
        <div className="my-12 mx-4 text-center text-lg md:text-3xl text-card-foreground font-light tracking-wide">
            <div className="my-2">
                Appreciate your visit{data?.me.name && `, ${data.me.name}`}!
            </div>
            <div className="my-2">
                Come back anytime!
            </div>
        </div>
    );
}


