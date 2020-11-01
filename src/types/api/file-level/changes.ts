import { Id } from '..';
import { ChangeAction } from '../changes';

type ChangeType = {
  /** The type of the target file. */
  type: 'document' | 'folder';
};

export type FileLevelMoveParams = ChangeType & {
  /** The ID of the document or folder to move. */
  file_id: Id;
  /** The ID of the parent folder to move the target file to. */
  parent_id: Id;
  /** The zero-indexed position the file should be in the parent folder, supply -1 to place it at the end. */
  index: number;
};

export type FileLevelEditParams = ChangeType & {
  /** The ID of the document or folder to edit. */
  file_id: Id;
  /** The new document or folder's title. */
  title: string;
};

export type FileLevelCreateParams = ChangeType & {
  /** The ID of the parent folder to create the target file in. */
  parent_id: Id;
  /** The zero-indexed position the file should be in the parent folder, supply -1 to place it at the end. */
  index: number;
  /** The new document or folder's title. */
  title?: string;
};

type FileLevelMove = ChangeAction<'move'> & FileLevelMoveParams;
type FileLevelEdit = ChangeAction<'edit'> & FileLevelEditParams;
type FileLevelCreate = ChangeAction<'create'> & FileLevelCreateParams;

export type FileLevelChange = FileLevelMove | FileLevelEdit | FileLevelCreate;
