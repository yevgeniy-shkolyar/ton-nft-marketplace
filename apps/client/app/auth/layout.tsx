import React, { PropsWithChildren } from 'react';

export const metadata = {
    title: 'Auth',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return <>{children}</>;
}
