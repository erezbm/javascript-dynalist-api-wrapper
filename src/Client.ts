import fetch from 'cross-fetch';
import Endpoint from './Endpoint';
import endpointToUrl from './endpointToUrl';
import { Id } from './types/api';
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

  /** Changes specific documents and folders. */
  changeDocumentsAndFolders(changes: FC.FileLevelChange[]) {
    return this.requestEndpoint(Endpoint.FileEdit, { changes });
  }

  moveDocumentOrFolder(moveChange: FC.FileLevelMoveParams) {
    return this.changeDocumentOrFolder('move', moveChange);
  }

  editDocumentOrFolder(editChange: FC.FileLevelEditParams) {
    return this.changeDocumentOrFolder('edit', editChange);
  }

  createDocumentOrFolder(createChange: FC.FileLevelCreateParams) {
    return this.changeDocumentOrFolder('create', createChange);
  }

  /** Fetches the content of a specific document. */
  readDocument(documentId: Id) {
    return this.requestEndpoint(Endpoint.DocRead, { file_id: documentId });
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

  private requestEndpoint(endpoint: Endpoint.FileList): Promise<R.FileListResponse>;
  private requestEndpoint(endpoint: Endpoint.FileEdit, parameters: P.FileEditRequestParameters): Promise<R.FileEditResponse>;
  private requestEndpoint(endpoint: Endpoint.DocRead, parameters: P.DocReadRequestParameters): Promise<R.DocReadResponse>;
  private requestEndpoint(endpoint: Endpoint.DocCheckForUpdates, parameters: P.DocCheckForUpdatesRequestParameters): Promise<R.DocCheckForUpdatesResponse>;
  private requestEndpoint(endpoint: Endpoint.DocEdit, parameters: P.DocEditRequestParameters): Promise<R.DocEditResponse>;
  private requestEndpoint(endpoint: Endpoint.InboxAdd, parameters: P.InboxAddRequestParameters): Promise<R.InboxAddResponse>;
  private requestEndpoint(endpoint: Endpoint.Upload, parameters: P.UploadRequestParameters): Promise<R.UploadResponse>;
  private requestEndpoint(endpoint: Endpoint.PrefGet, parameters: P.PrefGetRequestParameters): Promise<R.PrefGetResponse>;
  private requestEndpoint(endpoint: Endpoint.PrefSet, parameters: P.PrefSetRequestParameters): Promise<R.PrefSetResponse>;
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
