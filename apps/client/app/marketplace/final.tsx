'use client';

import { useQuery } from '@apollo/client';
import React from 'react';

import Spinner from '@/components/spinner';
import { MeDocument } from '@/graphql/generated/types';

export default function Final() {
    const { data } = useQuery(MeDocument);

    if (!data) {
        return (
            <div className="m-20 text-center">
                <Spinner size={48} />
            </div>
        );
    }
    return (
        <div className="mx-4 my-12 text-center text-lg font-light tracking-wide text-card-foreground md:text-3xl">
            <div className="my-2">
                Appreciate your visit{data.me.name && `, ${data.me.name}`}!
            </div>
            <div className="my-2">Come back anytime!</div>
        </div>
    );
}
