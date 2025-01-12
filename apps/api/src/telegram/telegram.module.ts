import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '../logger/logger.module';

import { TelegramLoginWidgetService } from './telegram-login-widget.service';
import { TelegramWebAppService } from './telegram-web-app.service';

@Module({
    imports: [ConfigModule, LoggerModule],
    providers: [TelegramLoginWidgetService, TelegramWebAppService],
    exports: [TelegramLoginWidgetService, TelegramWebAppService],
})
export class TelegramModule {}
