import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { TelegramModule } from '../telegram/telegram.module';

import { AuthGuard } from './auth.guards';
import { AuthService } from './auth.service';

@Module({
    imports: [LoggerModule, TelegramModule],
    providers: [AuthGuard, AuthService],
    exports: [AuthGuard, AuthService],
})
export class AuthModule {}
