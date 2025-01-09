import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

export type LoggerContext = Record<string, unknown>;

type Args = [message: Error | string, context?: LoggerContext];

@Injectable()
export class LoggerService {
    constructor(private readonly pinoLogger: PinoLogger) {}

    public log = (...args: Args): void => {
        this.pinoLogger.info(this.formatMessage(...args));
    };

    public debug = (...args: Args): void => {
        this.pinoLogger.debug(this.formatMessage(...args));
    };

    public info = (...args: Args): void => {
        this.pinoLogger.info(this.formatMessage(...args));
    };

    public warn = (...args: Args): void => {
        this.pinoLogger.warn(this.formatMessage(...args));
    };

    public error = (...args: Args): void => {
        this.pinoLogger.error(this.formatMessage(...args));
    };

    private formatMessage = (
        message: Error | string,
        cxt?: LoggerContext | string,
    ): unknown => {
        let context = cxt;

        if (typeof context === 'string') {
            context = { from: context };
        }

        let formattedMessage: string;
        if (message instanceof Error) {
            context = { ...context, stack: message.stack };
            formattedMessage = message.message;
        } else {
            formattedMessage = message;
        }

        return {
            msg: formattedMessage,
            timestamp: new Date().toISOString(),
            context: context ?? {},
        };
    };
}
