import * as E from './errors';
import ResponseCode from './ResponseCode';

type SuccessResponse<T> = ResponseCode<'Ok'> & T;

export type CommonResponseNoLockFail<TSuccess> = SuccessResponse<TSuccess> | E.InvalidErrorResponse | E.InvalidTokenErrorResponse | E.TooManyRequestsErrorResponse;
export type CommonResponse<TSuccess> = CommonResponseNoLockFail<TSuccess> | E.LockFailErrorResponse;
