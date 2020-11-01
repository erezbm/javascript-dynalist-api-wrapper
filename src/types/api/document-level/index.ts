import { Id } from '..';

export type VersionNumber = number;

export declare enum BackgroundColor {
  Red = 1,
  Orange = 2,
  Yellow = 3,
  Green = 4,
  Blue = 5,
  Purple = 6,
}

/** A heading level, 1 being the biggest. */
export type HeadingLevel = 1 | 2 | 3;

export interface Node {
  id: 'root' | Id;
  content: string;
  note: string;
  /** Array of the IDs of the children (ordered from the first child to the last). */
  children: Id[];
  /** Whether the node is collapsed (`undefined` means not collapsed). */
  collapsed?: true;
  /** Whether the node is checked off (`undefined` means not checked off). */
  checked?: true;
  /** Whether the node has a check box (`undefined` means no checkbox). */
  checkbox?: true;
  /** The background color of the content. */
  color?: BackgroundColor;
  /** The heading level of the content (1 is the biggest, `undefined` means not a heading). */
  heading?: HeadingLevel;
  /** Unix timestamp in milliseconds of the creation time. */
  created: number;
  /** Unix timestamp in milliseconds of the last modification time. */
  modified: number;
}
