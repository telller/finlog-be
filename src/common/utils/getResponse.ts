import { ResponseModel } from '@src/common/models/response.model';

export function getSuccessResponse(message: string, data?: any): ResponseModel {
    return { success: true, error: null, message, data };
}

export function getErrorResponse(message: string, error: any): ResponseModel {
    throw new Error(`${error} ||| ${message}`);
}
