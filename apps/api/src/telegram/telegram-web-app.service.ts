import assert from 'node:assert';
import { createHmac } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Static, TSchema, Type } from '@sinclair/typebox';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';
import JSONBigInt from 'json-bigint';

import { Config } from '../config';
import { LoggerService } from '../logger/logger.service';

import { TelegramUser } from './interfaces/telegram-user';

interface Chat {
    telegramChatId: string;
    telegramMessageId: number;
}

export const { parse } = JSONBigInt({
    useNativeBigInt: true,
    alwaysParseAsBig: true,
});

const telegramWebAppSchema = Type.Object({
    id: Type.BigInt(),
    is_bot: Type.Optional(Type.Boolean()),
    first_name: Type.String(),
    last_name: Type.Optional(Type.String()),
    username: Type.Optional(Type.String()),
    language_code: Type.String(),
    is_premium: Type.Optional(Type.Boolean()),
    added_to_attachment_menu: Type.Optional(Type.Boolean()),
    allows_write_to_pm: Type.Optional(Type.Boolean()),
    photo_url: Type.Optional(Type.String()),
});

export type TelegramWebApp = Static<typeof telegramWebAppSchema>;

@Injectable()
export class TelegramWebAppService {
    private secret: string;
    private compiledSchema: TypeCheck<TSchema>;

    constructor(
        readonly config: ConfigService<Config>,
        private readonly logger: LoggerService,
    ) {
        const { token } = config.get('telegram', {
            infer: true,
        })!;
        this.compiledSchema = TypeCompiler.Compile(telegramWebAppSchema);

        this.secret = token;
    }

    checkSignature = (
        telegramInitData: string,
    ): { user: string; chat?: Chat } => {
        const utf8 = Buffer.from(telegramInitData, 'base64').toString('utf8');
        const urlParams = new URLSearchParams(utf8);
        const hash = urlParams.get('hash');
        urlParams.delete('hash');
        urlParams.sort();
        let dataCheckString = '';
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += `${key}=${value}\n`;
        }

        dataCheckString = dataCheckString.slice(0, -1);
        const secret = createHmac('sha256', 'WebAppData').update(this.secret);
        const hmac = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        assert(hash === hmac, 'Invalid signature');

        const user = urlParams.get('user');
        const startParam = urlParams.get('start_param');

        assert(user, 'User not found');

        const arr = startParam?.split('_');

        const chat =
            arr && arr.length === 3
                ? {
                      telegramChatId: arr[1],
                      telegramMessageId: Number(arr[2]),
                  }
                : undefined;

        return { user, chat };
    };

    encodeTelegramWebAppToken = (
        token: string,
    ): { chat?: Chat; user: TelegramUser; issuer: 'tg-app' } => {
        const { user, chat } = this.checkSignature(token);

        const data: unknown = parse(user);

        if (this.compiledSchema.Check(data)) {
            const {
                id,
                username,
                first_name: firstName,
            } = this.compiledSchema.Decode<TelegramWebApp>(data);

            return {
                user: { id: String(id), username, firstName },
                chat,
                issuer: 'tg-app',
            };
        }

        const messages = this.compiledSchema.Errors(data);
        const message = [...messages]
            .map(error => `${error.path}: ${error.message}`)
            .join('\n');
        this.logger.error(message);
        throw new Error(message);
    };
}
