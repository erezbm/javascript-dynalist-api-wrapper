import fetch from 'cross-fetch';
import Endpoint from './Endpoint';
import endpointToUrl from './endpointToUrl';
import { Id } from './types/api';
import { PreferenceKey } from './types/api/account-level';
import * as DC from './types/api/document-level/changes';
import * as FC from './types/api/file-level/changes';
import * as P from './types/api/request-parameters';
import * as R from './types/api/responses';
import * as C from './types/client';

export default class Client {
  /** @param token Your API secret token. */
  constructor(private token: string) { }

  /** Lists all your documents and folders. */
  listDocumentsAndFolders() {
    return this.requestEndpoint(Endpoint.FileList);
  }

  /** Changes (moves, edits or creates) specific documents and folders. */
  changeDocumentsAndFolders(changes: readonly FC.FileLevelChange[]) {
    return this.requestEndpoint(Endpoint.FileEdit, { changes });
  }

  moveDocumentOrFolder(moveParams: FC.FileLevelMoveParams) {
    return this.changeDocumentOrFolder('move', moveParams);
  }

  editDocumentOrFolder(editParams: FC.FileLevelEditParams) {
    return this.changeDocumentOrFolder('edit', editParams);
  }

  createDocumentOrFolder(createParams: FC.FileLevelCreateParams) {
    return this.changeDocumentOrFolder('create', createParams);
  }

  /** Fetches the content of a specific document. */
  readDocument(documentId: Id) {
    return this.requestEndpoint(Endpoint.DocRead, { file_id: documentId });
  }

  /** Fetches the latest version numbers of specific documents. */
  fetchDocumentsVersionNumbers<T extends readonly Id[]>(documentIds: T) {
    return this.requestEndpoint(Endpoint.DocCheckForUpdates, { file_ids: documentIds });
  }

  /** Fetches the latest version number of a specific document. */
  async fetchDocumentVersionNumber(documentId: Id): C.FetchDocumentVersionNumberResult {
    const response = await this.fetchDocumentsVersionNumbers([documentId]);
    return response._code !== 'Ok' ? response : {
      _code: 'Ok',
      version: response.versions[documentId],
    };
  }

  /** Changes the content (inserts, edits, moves or deletes nodes) of a specific document. */
  changeDocumentContent(documentId: Id, changes: readonly DC.DocumentLevelChange[]) {
    return this.requestEndpoint(Endpoint.DocEdit, { file_id: documentId, changes });
  }

  insertNode(documentId: Id, insertParams: DC.DocumentLevelInsertParams) {
    return this.makeOneNodeChange(documentId, 'insert', insertParams);
  }

  editNode(documentId: Id, editParams: DC.DocumentLevelEditParams) {
    return this.makeOneNodeChange(documentId, 'edit', editParams);
  }

  moveNode(documentId: Id, moveParams: DC.DocumentLevelMoveParams) {
    return this.makeOneNodeChange(documentId, 'move', moveParams);
  }

  deleteNode(documentId: Id, deleteParams: DC.DocumentLevelDeleteParams) {
    return this.makeOneNodeChange(documentId, 'delete', deleteParams);
  }

  /** Adds a node to your inbox. */
  addToInbox(params: P.InboxAddRequestParameters) {
    return this.requestEndpoint(Endpoint.InboxAdd, params);
  }

  /** Uploads a file. (Pro only) */
  uploadFile(params: P.UploadRequestParameters) {
    return this.requestEndpoint(Endpoint.Upload, params);
  }

  /** Gets a user preference value. */
  getPreference<T extends PreferenceKey>(preferenceKey: T) {
    return this.requestEndpoint(Endpoint.PrefGet, { key: preferenceKey });
  }

  /** Sets a user preference value. */
  setPreference<T extends PreferenceKey>(params: P.PrefSetRequestParameters<T>) {
    return this.requestEndpoint(Endpoint.PrefSet, params);
  }

  // #region Private Helpers
  private changeDocumentOrFolder(action: 'move', change: FC.FileLevelMoveParams): C.FileLevelMoveOrEditResult;
  private changeDocumentOrFolder(action: 'edit', change: FC.FileLevelEditParams): C.FileLevelMoveOrEditResult;
  private changeDocumentOrFolder(action: 'create', change: FC.FileLevelCreateParams): C.FileLevelCreateResult;
  private async changeDocumentOrFolder(action: 'move' | 'edit' | 'create', change: any): Promise<any> {
    const response = await this.changeDocumentsAndFolders([{ action, ...change }]);
    return response._code !== 'Ok' ? response : {
      _code: 'Ok',
      ...(action !== 'create' ? { succeeded: response.results[0] } : { created_file_id: response.created[0] }),
    };
  }

  private makeOneNodeChange(documentId: Id, action: 'insert', change: DC.DocumentLevelInsertParams): C.DocumentLevelInsertResult;
  private makeOneNodeChange(documentId: Id, action: 'edit', change: DC.DocumentLevelEditParams): C.DocumentLevelChangeEmptyResult;
  private makeOneNodeChange(documentId: Id, action: 'move', change: DC.DocumentLevelMoveParams): C.DocumentLevelChangeEmptyResult;
  private makeOneNodeChange(documentId: Id, action: 'delete', change: DC.DocumentLevelDeleteParams): C.DocumentLevelChangeEmptyResult;
  private async makeOneNodeChange(documentId: Id, action: 'insert' | 'edit' | 'move' | 'delete', change: any): Promise<any> {
    const response = await this.changeDocumentContent(documentId, [{ action, ...change }]);
    return response._code !== 'Ok' ? response : {
      _code: 'Ok',
      ...(action === 'insert' ? { new_node_it: response.new_node_ids[0] } : {}),
    };
  }

  private requestEndpoint(endpoint: Endpoint.FileList): Promise<R.FileListResponse>;
  private requestEndpoint(endpoint: Endpoint.FileEdit, parameters: P.FileEditRequestParameters): Promise<R.FileEditResponse>;
  private requestEndpoint(endpoint: Endpoint.DocRead, parameters: P.DocReadRequestParameters): Promise<R.DocReadResponse>;
  private requestEndpoint<T extends readonly Id[]>(endpoint: Endpoint.DocCheckForUpdates, parameters: P.DocCheckForUpdatesRequestParameters<T>): Promise<R.DocCheckForUpdatesResponse<T>>;
  private requestEndpoint(endpoint: Endpoint.DocEdit, parameters: P.DocEditRequestParameters): Promise<R.DocEditResponse>;
  private requestEndpoint(endpoint: Endpoint.InboxAdd, parameters: P.InboxAddRequestParameters): Promise<R.InboxAddResponse>;
  private requestEndpoint(endpoint: Endpoint.Upload, parameters: P.UploadRequestParameters): Promise<R.UploadResponse>;
  private requestEndpoint<T extends PreferenceKey>(endpoint: Endpoint.PrefGet, parameters: P.PrefGetRequestParameters<T>): Promise<R.PrefGetResponse<T>>;
  private requestEndpoint<T extends PreferenceKey>(endpoint: Endpoint.PrefSet, parameters: P.PrefSetRequestParameters<T>): Promise<R.PrefSetResponse>;
  private async requestEndpoint(endpoint: Endpoint, parameters?: object) {
    const response = await fetch(endpointToUrl[endpoint].href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.token,
        ...parameters,
      }),
    });
    return response.json();
  }
  // #endregion Private Helpers
}
