import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { isColorSupported } from 'colorette';
import { LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';
import pinoPretty from 'pino-pretty';

import { Config } from '../config/index';
import { loggerConfig } from '../config/logger.config';

import { LoggerService } from './logger.service';

@Module({
    imports: [
        PinoLoggerModule.forRootAsync({
            imports: [ConfigModule.forFeature(loggerConfig)],
            inject: [ConfigService],
            useFactory: (config: ConfigService<Config>) => {
                const { level, format } = config.get('logger', {
                    infer: true,
                })!;

                return {
                    pinoHttp: {
                        autoLogging: false,
                        formatters: {
                            level: (level: string) => ({ level }),
                        },
                        level,
                        quietReqLogger: true,
                        ...(format === 'pretty'
                            ? {
                                  stream: pinoPretty({
                                      colorize: isColorSupported,
                                      levelFirst: true,
                                      ignore: 'pid,hostname',
                                  }),
                              }
                            : {}),
                    },
                };
            },
        }),
    ],
    providers: [
        {
            provide: LoggerService,
            inject: [PinoLogger],
            useFactory: (pinoLogger: PinoLogger) =>
                new LoggerService(pinoLogger),
        },
    ],
    exports: [LoggerService],
})
export class LoggerModule {}
