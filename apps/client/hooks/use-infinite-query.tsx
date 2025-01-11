/* eslint-disable unicorn/no-null */
import { useEffect, useState } from 'react';

const defaultOption = {
    root: null,
    rootMargin: '1px',
    threshold: 0.1,
};
export const useInfiniteScroll = (
    callback: () => void,
    option = defaultOption,
) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        let observer: IntersectionObserver | undefined;

        if (ref) {
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, option);
            observer.observe(ref);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [ref, option, callback]);

    return setRef;
};
