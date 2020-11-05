import { BackgroundColor, HeadingLevel } from '.';
import { Id } from '..';
import { ChangeAction } from '../changes';

export type DocumentLevelInsertParams = {
  /** The ID of the parent node to insert under. */
  parent_id: Id;
  /** The zero-indexed position the node should be in the parent node's children, supply -1 to place it at the end. */
  index: number;
  /** The new node's content. */
  content: string;
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

export type DocumentLevelEditParams = {
  /** The ID of the node to edit. */
  node_id: Id;
  /** The new content. */
  content: string;
  /** The new note. */
  note?: string;
  /** Whether the node should be checked off. */
  checked?: boolean;
  /** Whether the node should have a checkbox. */
  checkbox?: boolean;
  /** The new heading level. */
  heading?: HeadingLevel;
  /** The new background color. */
  color?: BackgroundColor;
};

export type DocumentLevelMoveParams = {
  /** The ID of the node to move. */
  node_id: Id;
  /** The ID of the parent node to move under. */
  parent_id: Id;
  /** The zero-indexed position the node should be in the parent node's children, supply -1 to place it at the end. */
  index: number;
};

export type DocumentLevelDeleteParams = {
  /** The Id of the node to delete. */
  node_id: Id;
};

type DocumentLevelInsert = ChangeAction<'insert'> & DocumentLevelInsertParams;
type DocumentLevelEdit = ChangeAction<'edit'> & DocumentLevelEditParams;
type DocumentLevelMove = ChangeAction<'move'> & DocumentLevelMoveParams;
type DocumentLevelDelete = ChangeAction<'delete'> & DocumentLevelDeleteParams;

export type DocumentLevelChange = DocumentLevelInsert | DocumentLevelEdit | DocumentLevelMove | DocumentLevelDelete;
