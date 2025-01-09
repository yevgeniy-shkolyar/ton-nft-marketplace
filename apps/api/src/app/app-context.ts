import { Request } from 'express';

// import { AppAbility } from '../auth/policy/ability.factory';
// import { User } from '../prisma/client';

export interface GraphqlContextChat {
    telegramChatId: string;
    telegramMessageId: number;
}

export interface GraphqlContext {
    request: Request;
    // user: User;
    chat: GraphqlContextChat | undefined;
    tokenIssuer: string;
    // ability: AppAbility;
}
