import * as E from './errors';
import { CommonResponse, CommonResponseWithoutLockFail } from './helpers';

// Types aliases for each endpoint's possible responses with a type parameter for the data on success.
export type ParameterizedFileListResponse<T> = CommonResponse<T>;
export type ParameterizedFileEditResponse<T> = CommonResponse<T>;
export type ParameterizedDocReadResponse<T> = CommonResponse<T>
| E.UnauthorizedErrorResponse
| E.NotFoundErrorResponse;
export type ParameterizedDocCheckForUpdatesResponse<T> = CommonResponseWithoutLockFail<T>;
export type ParameterizedDocEditResponse<T> = CommonResponse<T>
| E.UnauthorizedErrorResponse
| E.NotFoundErrorResponse
| E.NodeNotFoundErrorResponse;
export type ParameterizedInboxAddResponse<T> = CommonResponse<T> | E.NoInboxErrorResponse;
export type ParameterizedUploadResponse<T> = CommonResponseWithoutLockFail<T>
| E.NeedProErrorResponse
| E.QuotaExceededErrorResponse;
export type ParameterizedPrefGetResponse<T> = CommonResponseWithoutLockFail<T>;
export type ParameterizedPrefSetResponse<T> = CommonResponseWithoutLockFail<T>;
