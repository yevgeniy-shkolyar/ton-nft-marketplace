'use client';

import * as React from 'react';
import { Suspense } from 'react';

import { OneSkeleton } from '@/components/one-suspens';

const SeriesPage: React.FC = () => {
    return (
        <Suspense fallback={<OneSkeleton />}>
            <>Hi!</>
        </Suspense>
    );
};

export default SeriesPage;
