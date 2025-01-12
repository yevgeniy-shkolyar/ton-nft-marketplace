'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import AppLoader from '@/components/app-loader';
import { Header } from '@/components/header';
import Spinner from '@/components/spinner';

const AuthCallback = () => {
    const router = useRouter();
    useEffect(() => {
        const { search, hash } = globalThis.document.location;

        const searchParameters = new URLSearchParams(hash.slice(1));
        const tgWebAppData = searchParameters.get('tgWebAppData') ?? '';

        const tgWebAppStartParameter =
            search.startsWith('?') &&
            new URLSearchParams(search.slice(1)).get('tgWebAppStartParam');

        let data;
        if (hash.startsWith('#')) {
            data = ['tg-app', tgWebAppData];
        } else if (search.startsWith('?')) {
            data = ['tg-web', search.slice(1)];
        } else {
            data = undefined;
        }

        if (data) {
            const [issuer, parameters] = data;

            fetch('/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: `${issuer} ${globalThis.btoa(parameters)}`,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        router.push(
                            tgWebAppStartParameter
                                ? `/${tgWebAppStartParameter.replaceAll('_', '/')}`
                                : '/marketplace',
                        );
                    }
                })
                .catch((error: unknown) => {
                    console.error(error);
                });
        }
    }, []);

    return <Header>
        <div className="my-4 whitespace-nowrap">
            Magic in progress...
        </div>
        <Spinner size={48} />
    </Header>;
};

export default AuthCallback;
