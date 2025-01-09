import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export function OneSkeleton() {
    return (
        <div className="flex size-full flex-col p-4">
            <Skeleton className="mb-8 h-32 w-full bg-card" />
            <Skeleton className="mb-4 h-12 w-full bg-card" />
        </div>
    );
}
