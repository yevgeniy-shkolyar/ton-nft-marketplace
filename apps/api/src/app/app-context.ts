import { Request } from 'express';

import { TelegramUser } from '../telegram/interfaces/telegram-user';

export interface GraphqlContextChat {
    telegramChatId: string;
    telegramMessageId: number;
}

export interface GraphqlContext {
    request: Request;
    user?: TelegramUser;
    tokenIssuer: 'tg-web' | 'bff' | 'tg-app';
}
