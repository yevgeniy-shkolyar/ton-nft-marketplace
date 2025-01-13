'use client';

import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface CopyInlineTextBlockProperties {
    title: string;
    value?: string | null;
}

const CopyInlineTextBlock: React.FC<CopyInlineTextBlockProperties> = ({
    value,
    title,
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value ?? '');
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    if (!value) {
        return null;
    }

    return (
        <div
            className={cn(
                'items-start my-4 flex cursor-pointer ',
                isCopied ? 'text-green-600' : 'text-muted-foreground',
            )}
            onClick={copyToClipboard}
        >
            <div className="cursor-pointer whitespace-nowrap">
                {title}:&nbsp;
            </div>

            {value && value.length > 20 ? (
                <>
                    <div className="truncate">{value.slice(0, -8)}</div>
                    <div className="whitespace-nowrap">{value.slice(-8)}</div>
                </>
            ) : (
                <div className="truncate">{value}</div>
            )}

            <div className="ml-2 text-right">
                {isCopied ? (
                    <Check className="size-4" />
                ) : (
                    <Copy className="size-4" />
                )}
            </div>
        </div>
    );
};

export default CopyInlineTextBlock;
