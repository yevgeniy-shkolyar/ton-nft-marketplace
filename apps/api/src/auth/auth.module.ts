import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { TelegramLoginWidgetModule } from '../telegram-login-widget/telegram-login-widget.module';

import { AuthGuard } from './auth.guards';
import { AuthService } from './auth.service';

@Module({
    imports: [LoggerModule, TelegramLoginWidgetModule],
    providers: [AuthGuard, AuthService],
    exports: [AuthGuard, AuthService],
})
export class AuthModule {}
