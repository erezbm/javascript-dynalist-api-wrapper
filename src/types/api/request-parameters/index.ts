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

export type DocCheckForUpdatesRequestParameters = {
  // TODO
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
