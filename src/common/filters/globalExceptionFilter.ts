import { IncomingMessage } from 'http';
import { Response } from 'express';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Messages } from '@src/common/constants/messages';

export const getStatusCode = (exception: unknown): number => {
    return exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorDescription = (exception: any) => {
    const errorText = String(exception).split('|||');
    return {
        description: errorText[0].trim(),
        message:
            errorText[1]?.trim() ||
            (exception &&
                typeof exception.getResponse === 'function' &&
                exception.getResponse().message) ||
            Messages.GeneralError,
    };
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger();

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<IncomingMessage>();
        const code = getStatusCode(exception);
        const { description, message } = getErrorDescription(exception);

        if (process.env.NODE_ENV !== 'test' && ![404].includes(code)) {
            this.logger.error(exception.message, description, exception.stack);
        }

        response.status(code).json({
            success: false,
            message,
            error: {
                timestamp: new Date().toISOString(),
                description: exception.name,
                path: request.url,
                statusCode: code,
            },
        });
    }
}
