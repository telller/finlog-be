import { NextFunction, Request, Response } from 'express';
import { NestMiddleware } from '@nestjs/common';
import morgan from 'morgan';
import { Logger } from '@src/shared/logger/logger.service';

export class LoggerMorganMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        morgan(':method :url :status :res[content-length] - :response-time ms', {
            stream: { write: (str: string) => this.logger.log(str.replace('\n', '')) },
        })(req, res, next);
    }
}
