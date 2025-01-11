import assert from 'node:assert';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
    private secret: string;

    constructor(
        config: ConfigService<Config>,
        private readonly logger: LoggerService,
    ) {
        const { secret } = config.get('app', {
            infer: true,
        })!;

        this.secret = secret;
    }

    verify = (token: string): void => {
        assert(token === this.secret, 'Token is invalid');
    };
}
