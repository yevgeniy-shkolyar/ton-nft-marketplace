import { UserInputError } from '@nestjs/apollo';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { TeamApiModule } from './app/app.module';
import { Config } from './config';
import { LoggerService } from './logger/logger.service';

export async function bootstrap(port?: number) {
    const app = await NestFactory.create<NestExpressApplication>(
        TeamApiModule,
        new ExpressAdapter(),
        {
            bufferLogs: true,
        },
    );

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const fields = errors.map(error => ({
                    property: error.property,
                    message: Object.values(error.constraints ?? {}).join(', '),
                }));
                return new UserInputError(ReasonPhrases.BAD_REQUEST, {
                    extensions: {
                        code: StatusCodes.BAD_REQUEST,
                        fields,
                    },
                });
            },
        }),
    );

    app.useGlobalPipes(new ValidationPipe());
    const appConfig = app.get<ConfigService<Config>>(ConfigService).get('app', {
        infer: true,
    })!;

    const loggerService = app.get(LoggerService);
    app.useLogger(loggerService);

    app.use(cookieParser());

    await app.listen(port ?? appConfig.port, '0.0.0.0');

    return app;
}
