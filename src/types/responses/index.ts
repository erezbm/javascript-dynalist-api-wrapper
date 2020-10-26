import { Id, File } from '..';
import * as E from './errors';
import SuccessfulResponse from './SuccessfulResponse';

export type FileListResponse = (SuccessfulResponse & {
  root_file_id: Id;
  files: File[];
})
| E.InvalidErrorResponse
| E.InvalidTokenErrorResponse
| E.TooManyRequestsErrorResponse
| E.LockFailErrorResponse;

export type FileEditResponse = {};

export type DocReadResponse = {};

export type DocCheckForUpdatesResponse = {};

export type DocEditResponse = {};

export type InboxAddResponse = {};

export type UploadResponse = {};

export type PrefGetResponse = {};

export type PrefSetResponse = {};
