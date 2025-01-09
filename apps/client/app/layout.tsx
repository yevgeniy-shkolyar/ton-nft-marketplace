import { Roboto } from 'next/font/google';
import Script from 'next/script';
import * as React from 'react';
import type { PropsWithChildren } from 'react';

import '../globals.css';

const mono = Roboto({ subsets: ['cyrillic', 'latin'], weight: '400' });

export const metadata = {
    title: 'Auth',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <Script
                    src="https://telegram.org/js/telegram-web-app.js"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={mono.className}>{children}</body>
        </html>
    );
}
