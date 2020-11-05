import { Id } from '..';

export declare enum Permission {
  NoAccess = 0,
  ReadOnly = 1,
  Edit = 2,
  Manage = 3,
  Owner = 4,
}

interface FileBase {
  id: Id;
  title: string;
  permission: Permission;
}

export interface Document extends FileBase {
  type: 'document';
}

export interface Folder extends FileBase {
  type: 'folder';
  collapsed: boolean;
  children: Id[];
}

export type File = Document | Folder;
