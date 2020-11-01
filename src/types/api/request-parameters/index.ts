import { Id } from '..';
import { FileLevelChange } from '../file-level/changes';

export type FileEditRequestParameters = {
  /** Array of changes to perfrom. */
  changes: FileLevelChange[];
};

export type DocReadRequestParameters = {
  /** The ID of the document to fetch. */
  file_id: Id;
};

export type DocCheckForUpdatesRequestParameters<T extends readonly Id[]> = {
  /** Array of the IDs of the documents to fetch the version numbers of. */
  file_ids: T;
};

export type DocEditRequestParameters = {
  // TODO
};

export type InboxAddRequestParameters = {
  // TODO
};

export type UploadRequestParameters = {
  // TODO
};

export type PrefGetRequestParameters = {
  // TODO
};

export type PrefSetRequestParameters = {
  // TODO
};
