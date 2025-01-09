'use client';

import React from 'react';

export default function AppLoader({ text }: { readonly text: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center">
                <p className="mt-4 text-lg font-semibold text-muted">{text}</p>
            </div>
        </div>
    );
}
