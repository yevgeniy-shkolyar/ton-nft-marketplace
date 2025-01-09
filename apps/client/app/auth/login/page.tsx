'use client';

import { env } from 'next-runtime-env';
import React from 'react';

import TelegramButton from './login';

const AuthCallback = () => {
    return (
        <TelegramButton botName={env('NEXT_PUBLIC_TELEGRAM_BOT_NAME') ?? ''} />
    );
};

export default AuthCallback;
