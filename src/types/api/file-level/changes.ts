import { Id } from '..';

type ChangeAction<T> = { action: T; };
type ChangeType = {
  /** The type of the target file. */
  type: 'document' | 'folder';
};

export type FileLevelMoveParams = ChangeType & {
  /** The ID of the document or folder you're trying to move. */
  file_id: Id;
  /** The ID of the parent folder you want to move the target file to. */
  parent_id: Id;
  /** The zero-indexed position you want the file to be in the parent folder, supply -1 to place it at the end. */
  index: number;
};

export type FileLevelEditParams = ChangeType & {
  /** The ID of the document or folder you're trying to edit. */
  file_id: Id;
  /** The new title that you're trying to set. */
  title: string;
};

export type FileLevelCreateParams = ChangeType & {
  /** The ID of the parent folder you want to create the target file in. */
  parent_id: Id;
  /** The zero-indexed position you want the file to be in the parent folder, supply -1 to place it at the end. */
  index: number;
  /** The new title that you're trying to set. */
  title?: string;
};

type FileLevelMoveChange = ChangeAction<'move'> & FileLevelMoveParams;
type FileLevelEditChange = ChangeAction<'edit'> & FileLevelEditParams;
type FileLevelCreateChange = ChangeAction<'create'> & FileLevelCreateParams;

export type FileLevelChange = FileLevelMoveChange | FileLevelEditChange | FileLevelCreateChange;
