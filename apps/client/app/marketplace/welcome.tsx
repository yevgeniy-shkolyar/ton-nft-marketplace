'use client';

import React from 'react';

import { Header } from '@/components/header';

export default function Welcome() {
    return (
        <Header>
            <div className="my-4 whitespace-nowrap">Welcome to the TON</div>
            <div className="my-4 whitespace-nowrap">NFT Marketplace!</div>
        </Header>
    );
}
