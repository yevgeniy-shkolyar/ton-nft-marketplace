import assert from 'node:assert';
import { createHash, createHmac } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Static, TSchema, Type } from '@sinclair/typebox';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';
import JSONBigInt from 'json-bigint';

import { Config } from '../config';
import { LoggerService } from '../logger/logger.service';

import { TelegramUser } from './interfaces/telegram-user';

export const { parse } = JSONBigInt({
    useNativeBigInt: true,
    alwaysParseAsBig: true,
});

const telegramLoginWidgetSchema = Type.Object({
    id: Type.BigInt(),
    firstName: Type.String(),
    username: Type.Optional(Type.String()),
    photoUrl: Type.String(),
    authDate: Type.BigInt(),
});

export type TelegramLoginWidget = Static<typeof telegramLoginWidgetSchema>;

@Injectable()
export class TelegramLoginWidgetService {
    private secret: string;
    private compiledSchema: TypeCheck<TSchema>;

    constructor(
        readonly config: ConfigService<Config>,
        private readonly logger: LoggerService,
    ) {
        const { token } = config.get('telegram', {
            infer: true,
        })!;
        this.compiledSchema = TypeCompiler.Compile(telegramLoginWidgetSchema);

        this.secret = token;
    }

    checkSignatureJson = (
        userData: Record<string, string | number | bigint>,
        hash: string,
    ) => {
        const secretHash = createHash('sha256').update(this.secret).digest();

        const dataCheckString = Object.keys(userData)
            .sort((a, b) => a.localeCompare(b))
            .map(key => `${key}=${String(userData[key])}`)
            .join('\n');

        const hmac = createHmac('sha256', secretHash)
            .update(dataCheckString)
            .digest('hex');

        assert(hash === hmac, 'Invalid signature');
    };

    checkSignature = (telegramInitData: string, salt?: string) => {
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

        const secret = (
            salt ? createHmac('sha256', salt) : createHash('sha256')
        ).update(this.secret);
        const hmac = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        assert(hash === hmac, 'Invalid signature');

        const id = urlParams.get('id');
        assert(id);

        return {
            id: String(id),
            firstName: urlParams.get('first_name'),
            username: urlParams.get('username'),
            photoUrl: urlParams.get('photo_url'),
            authDate: Number(urlParams.get('auth_date')),
        };
    };

    decodeTelegramLoginWidgetToken = (
        token: string,
    ): { user: TelegramUser; issuer: 'tg-web' } => {
        const { id, username, firstName } = this.checkSignature(token);

        assert(username, 'username is empty');
        assert(firstName, 'firstName is empty');

        return { user: { id, username, firstName }, issuer: 'tg-web' };
    };
}
