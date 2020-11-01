import { Id } from './api';
import { VersionNumber } from './api/document-level';
import * as P from './api/responses/parameterized';

export type FileLevelMoveOrEditResult = Promise<P.ParameterizedFileEditResponse<{ succeeded: boolean; }>>;
export type FileLevelCreateResult = Promise<P.ParameterizedFileEditResponse<{ created_file_id?: Id; }>>;

export type FetchDocumentVersionNumberResult = Promise<P.ParameterizedDocCheckForUpdatesResponse<{ version?: VersionNumber }>>;
