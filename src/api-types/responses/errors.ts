import ResponseCode from './response-code';

type ErrorResponse<T> = ResponseCode<T> & { _msg?: string; };

export type InvalidErrorResponse = ErrorResponse<'Invalid'>;
export type InvalidTokenErrorResponse = ErrorResponse<'InvalidToken'>;
export type TooManyRequestsErrorResponse = ErrorResponse<'TooManyRequests'>;
export type LockFailErrorResponse = ErrorResponse<'LockFail'>;
export type UnauthorizedErrorResponse = ErrorResponse<'Unauthorized'>;
export type NotFoundErrorResponse = ErrorResponse<'NotFound'>;
export type NodeNotFoundErrorResponse = ErrorResponse<'NodeNotFound'>;
export type NoInboxErrorResponse = ErrorResponse<'NoInbox'>;
export type NeedProErrorResponse = ErrorResponse<'NeedPro'>;
export type QuotaExceededErrorResponse = ErrorResponse<'QuotaExceeded'>;
