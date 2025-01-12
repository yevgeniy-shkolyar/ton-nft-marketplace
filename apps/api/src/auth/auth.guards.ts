import assert from 'node:assert';

import {
    CanActivate,
    CustomDecorator,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { type Request } from 'express';

import { GraphqlContext, GraphqlContextChat } from '../app/app-context';
import { TelegramUser } from '../telegram/interfaces/telegram-user';
import { TelegramLoginWidgetService } from '../telegram/telegram-login-widget.service';
import { TelegramWebAppService } from '../telegram/telegram-web-app.service';

import { AuthService } from './auth.service';

export const Public = (): CustomDecorator => {
    return SetMetadata('isPublic', true);
};

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly telegramLoginWidgetService: TelegramLoginWidgetService,
        private readonly authService: AuthService,
        private readonly telegramWebAppService: TelegramWebAppService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );

        if (isPublic) {
            return true;
        }

        if (context.getType<GqlContextType>() === 'graphql') {
            return await this.handleGraphqlRequest(context);
        }

        return false;
    }

    async handleGraphqlRequest(context: ExecutionContext): Promise<boolean> {
        const graphQlContext = GqlExecutionContext.create(context);
        const { req } = graphQlContext.getContext<{
            req: Request;
        }>();

        const cookiesAuthorization = (req.cookies as Record<string, string>)
            .authorization as string | undefined;

        const authorization = req.headers.authorization ?? cookiesAuthorization;

        assert(authorization, 'Token is empty');

        const appContext = graphQlContext.getContext<GraphqlContext>();

        const [issuer, token] = authorization.split(' ');

        const decoded = this.decode({ issuer, token });

        appContext.user = decoded.user;
        appContext.tokenIssuer = decoded.issuer;

        return true;
    }

    decode = ({
        issuer,
        token,
    }: {
        issuer: string;
        token: string;
    }): {
        user?: TelegramUser;
        chat?: GraphqlContextChat;
        issuer: 'bff' | 'tg-web' | 'tg-app';
    } => {
        if (issuer === 'tg-web' && typeof token === 'string') {
            return this.telegramLoginWidgetService.decodeTelegramLoginWidgetToken(
                token,
            );
        }

        if (issuer === 'tg-app' && typeof token === 'string') {
            return this.telegramWebAppService.encodeTelegramWebAppToken(token);
        }

        if (issuer === 'bff' && typeof token === 'string') {
            this.authService.verify(token);
            return { issuer: 'bff' };
        }

        throw new Error('Unknown token');
    };
}
