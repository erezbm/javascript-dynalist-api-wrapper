import { Id } from '..';
import { Node } from '../document-level';
import { File } from '../file-level';
import * as P from './parameterized';

export type FileListResponse = P.ParameterizedFileListResponse<{
  /** The ID of the root folder. */
  root_file_id: Id;
  files: File[];
}>;

export type FileEditResponse = P.ParameterizedFileEditResponse<{
  /** Array of booleans representing whether each change succeeded, in the order they were requested. */
  results: boolean[];
  /** Array of the file IDs of the successfully created files, in the order they were requested. */
  created: Id[];
}>;

export type DocReadResponse = P.ParameterizedDocReadResponse<{
  /** The ID of the fetched document. */
  file_id: Id;
  /** The title of the fetched document (which is the `content` of the root node). */
  title: string;
  /** The version number of the fetched document. */
  version: number;
  nodes: Node[];
}>;

export type DocCheckForUpdatesResponse = P.ParameterizedDocCheckForUpdatesResponse<{
  // TODO
}>;

export type DocEditResponse = P.ParameterizedDocEditResponse<{
  // TODO
}>;

export type InboxAddResponse = P.ParameterizedInboxAddResponse<{
  // TODO
}>;

export type UploadResponse = P.ParameterizedUploadResponse<{
  // TODO
}>;

export type PrefGetResponse = P.ParameterizedPrefGetResponse<{
  // TODO
}>;

export type PrefSetResponse = P.ParameterizedPrefSetResponse<{
  // TODO
}>;
