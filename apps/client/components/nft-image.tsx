'use client';

import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface NftImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    alt?: string | null;
    src?: string | null;
}

const ERROR_SRC = '/not-found.svg';
const DEFAULT_SIZE = 500;

export const NftImage = ({
    alt,
    src,
    width = DEFAULT_SIZE,
    height = DEFAULT_SIZE,
    ...props
}: NftImageProps) => {
    const [imgSrc, setImgSrc] = useState(src ?? ERROR_SRC);

    const handleError = (): void => {
        setImgSrc(ERROR_SRC);
    };

    return (
        <>
            <Image
                {...props}
                src={imgSrc}
                alt={alt ?? 'Unnamed'}
                width={width}
                height={height}
                className={cn('transition-all hover:scale-105 w-auto')}
                unoptimized
                onError={handleError}
            />
        </>
    );
};

export default NftImage;
