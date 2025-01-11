import { Request } from 'express';

import { TelegramUser } from '../telegram-login-widget/interfaces/telegram-user';

export interface GraphqlContextChat {
    telegramChatId: string;
    telegramMessageId: number;
}

export interface GraphqlContext {
    request: Request;
    user?: TelegramUser;
    tokenIssuer: 'tg-web' | 'bff';
}
