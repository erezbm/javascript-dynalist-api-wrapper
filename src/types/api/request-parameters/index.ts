import { Id } from '..';
import { PreferenceKey, Preferences } from '../account-level';
import { BackgroundColor, HeadingLevel } from '../document-level';
import { DocumentLevelChange } from '../document-level/changes';
import { FileLevelChange } from '../file-level/changes';

export type FileEditRequestParameters = {
  /** Array of changes to perfrom. */
  changes: readonly FileLevelChange[];
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
  /** The ID of the document to change. */
  file_id: Id,
  /** Array of changes to perfrom. */
  changes: readonly DocumentLevelChange[],
};

export type InboxAddRequestParameters = {
  /** The zero-indexed position the node should be in the inbox, supply -1 to place it at the end, if not given the user setting will be used. */
  index?: number;
  /** The new node's content. */
  content?: string;
  /** The new node's note. */
  note?: string;
  /** Whether the new node should be checked off. */
  checked?: boolean;
  /** Whether the new node should have a checkbox. */
  checkbox?: boolean;
  /** The new node's heading level. */
  heading?: HeadingLevel;
  /** The new node's background color. */
  color?: BackgroundColor;
};

export type UploadRequestParameters = {
  /** The name of the file to upload, including extension. */
  filename: string;
  /** The mime type of the file, such as "text/plain", "image/jpeg", "application/pdf". */
  content_type: string;
  /** The Base64 encoded data. */
  data: string;
};

export type PrefGetRequestParameters<PrefKey extends PreferenceKey> = {
  /** The preference key. */
  key: PrefKey;
};

export type PrefSetRequestParameters<PrefKey extends PreferenceKey> = {
  /** The preference key. */
  key: PrefKey;
  /** The preference value to set. */
  value: Preferences[PrefKey];
};
