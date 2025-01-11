import { Loader2 } from 'lucide-react';
import React from 'react';
import type { JSX } from 'react';

import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size: number;
}
export const Spinner: React.FC<SpinnerProps> = ({
    className,
    size,
    ...props
}): JSX.Element => {
    return (
        <div
            className={cn('flex h-full items-center justify-center', className)}
            {...props}
        >
            <Loader2 className="animate-spin text-gray-500" size={size} />
        </div>
    );
};

export default Spinner;
