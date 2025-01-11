import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '../logger/logger.module';

import { TelegramLoginWidgetService } from './telegram-login-widget.service';

@Module({
    imports: [ConfigModule, LoggerModule],
    providers: [TelegramLoginWidgetService],
    exports: [TelegramLoginWidgetService],
})
export class TelegramLoginWidgetModule {}
