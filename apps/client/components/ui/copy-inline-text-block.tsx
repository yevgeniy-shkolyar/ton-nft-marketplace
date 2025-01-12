'use client';

import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

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
            className="items-right items-between my-4 flex cursor-pointer text-muted-foreground md:items-start"
            onClick={copyToClipboard}
        >
            <div className="cursor-pointer whitespace-nowrap">
                {title}:&nbsp;
            </div>

            <div className="truncate ">{value}</div>
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
