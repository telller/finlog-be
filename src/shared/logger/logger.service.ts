import { LoggerService, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { Environment } from '@src/config/constants/env.enum';
import {
    LoggerLevels,
    DEFAULT_LOG_LEVEL,
    DEFAULT_LOG_FORMAT,
    LogLevelFormat,
    LogLevel,
} from './constants/logger.constant';

export class Logger extends ConsoleLogger implements LoggerService {
    private readonly logLevel: string;

    private readonly env: string;

    private readonly serviceIdentifier: string;

    constructor(context: string, options?: ConsoleLoggerOptions) {
        super(context, { ...(options || {}), timestamp: true });

        this.env = process.env.NODE_ENV || Environment.DEVELOPMENT;
        this.logLevel = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL;
        this.serviceIdentifier = process.env.SERVICE_IDENTIFIER || 'finglog-be';

        const logLevel = this.logLevel as keyof typeof LoggerLevels;
        this.setLogLevels(LoggerLevels[logLevel] || LoggerLevels[DEFAULT_LOG_LEVEL]);
    }

    private logMessage(logLevel: LogLevel, message: any, optionalParams?: any[]): void {
        switch (typeof optionalParams) {
            case 'undefined':
                super[logLevel](message);
                break;
            case 'object':
                if (Array.isArray(optionalParams) && optionalParams.length === 0) {
                    super[logLevel](message);
                } else {
                    super[logLevel](message, JSON.stringify(optionalParams));
                }
                break;
            case 'string':
            default:
                super[logLevel](message, optionalParams);
        }
    }

    verbose(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.LOG, message, optionalParams);
    }

    log(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.LOG, message, optionalParams);
    }

    debug(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.DEBUG, message, optionalParams);
    }

    warn(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.WARN, message, optionalParams);
    }

    error(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.ERROR, message, optionalParams);
    }

    fatal(message: any, ...optionalParams: any[]): void {
        this.logMessage(LogLevel.FATAL, message, optionalParams);
    }

    protected getTimestamp(): string {
        return new Date().toISOString();
    }

    protected formatContext(context: any): any {
        try {
            const parsedContext = JSON.parse(context);
            return Array.isArray(parsedContext) && parsedContext.length === 1
                ? parsedContext[0]
                : parsedContext;
        } catch (_) {
            /* empty */
        }
        return context;
    }

    private formatLogLevel(logLevel: LogLevel): string {
        return LogLevelFormat[logLevel] || LogLevelFormat[DEFAULT_LOG_FORMAT];
    }

    protected formatPid(pid: number): string {
        return `[Nest] ${pid.toString()}`;
    }

    private isStack(stack: string): boolean {
        return /^(.)+\n\s+at .+:\d+:\d+/.test(stack);
    }

    private getStackTrace(logLevel: LogLevel, message: any, contextMessage: any): string | null {
        if (message instanceof Error) {
            return message.stack || null;
        }
        const stack = (Array.isArray(contextMessage) ? contextMessage : [contextMessage]).find(
            (value) => this.isStack(value),
        );
        if (stack) {
            return stack;
        }
        if (logLevel === 'error') {
            return new Error().stack || null;
        }
        return null;
    }

    protected formatTimestampDiff(timestampDiff: number): string {
        return `+${timestampDiff}ms`;
    }

    private filterContext(contextMessage: any): any | undefined {
        if (!this.isStack(contextMessage)) {
            return Array.isArray(contextMessage)
                ? contextMessage.filter((value) => !this.isStack(value))
                : contextMessage || this.context;
        }
        return undefined;
    }

    formatMessage(
        logLevel: LogLevel,
        message: unknown,
        pidMessage: string,
        formattedLogLevel: string,
        contextMessage: string,
        timestampDiff: string,
    ): string {
        if (this.env === Environment.LOCAL) {
            return super.formatMessage(
                logLevel,
                message,
                pidMessage,
                formattedLogLevel,
                contextMessage,
                timestampDiff,
            );
        }
        const logMessage = message instanceof Error ? message?.message : message;
        const stackTrace = this.getStackTrace(logLevel, message, contextMessage);
        const context = this.filterContext(contextMessage);
        const contextString = typeof context === 'string' ? context : JSON.stringify(context) || '';
        const result = {
            // Required fields
            LogLevel: this.formatLogLevel(logLevel),
            Message: logMessage,
            UserID: this.serviceIdentifier,
            Timestamp: this.getTimestamp(),
            Environment: this.env,
            ServiceName: this.serviceIdentifier,
            // HTTP fields
            // http_path: HttpPath,
            // http_method: HttpMethod,
            // http_status: HttpStatus,
            // Additional fields
            context: contextString,
            stacktrace: stackTrace,
            pid: pidMessage,
            timestampDiff,
        };
        return `${JSON.stringify(result)}\n`;
    }
}
