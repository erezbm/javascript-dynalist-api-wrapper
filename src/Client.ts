import fetch from 'cross-fetch';
import Endpoint from './Endpoint';
import endpointToUrl from './endpointToUrl';
import * as C from './types/api/file-level/changes';
import * as P from './types/api/request-parameters';
import * as R from './types/api/responses';
import * as Cl from './types/client';

export default class Client {
  /** @param token Your API secret token. */
  constructor(private token: string) { }

  /** Lists all your documents and folders. */
  listDocumentsAndFolders() {
    return this.requestEndpoint(Endpoint.FileList);
  }

  /** Changes specific documents and folders. */
  changeDocumentsAndFolders(changes: C.FileLevelChange[]) {
    return this.requestEndpoint(Endpoint.FileEdit, { changes });
  }

  async moveDocumentOrFolder(moveChange: C.FileLevelMoveParams): Cl.FileLevelMoveOrEditResult {
    const response = await this.changeDocumentsAndFolders([{ action: 'move', ...moveChange }]);
    if (response._code === 'Ok') return { _code: 'Ok', succeeded: response.results[0] };
    return response;
  }

  async editDocumentOrFolder(editChange: C.FileLevelEditParams): Cl.FileLevelMoveOrEditResult {
    const response = await this.changeDocumentsAndFolders([{ action: 'edit', ...editChange }]);
    if (response._code === 'Ok') return { _code: 'Ok', succeeded: response.results[0] };
    return response;
  }

  async createDocumentOrFolder(createChange: C.FileLevelCreateParams): Cl.FileLevelCreateResult {
    const response = await this.changeDocumentsAndFolders([{ action: 'create', ...createChange }]);
    if (response._code === 'Ok') return { _code: 'Ok', created_file_id: response.created[0] };
    return response;
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
}
