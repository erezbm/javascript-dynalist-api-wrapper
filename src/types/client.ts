import { Id } from './api';
import * as P from './api/responses/parameterized';

export type FileLevelMoveOrEditResult = Promise<P.ParameterizedFileEditResponse<{ succeeded: boolean; }>>;
export type FileLevelCreateResult = Promise<P.ParameterizedFileEditResponse<{ created_file_id?: Id; }>>;
