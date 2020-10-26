import fetch from 'cross-fetch';
import Endpoint from './Endpoint';
import endpointToUrl from './endpointToUrl';
import type * as P from './types/request-parameters';
import type * as R from './types/responses';

export default class Client {
  constructor(private token: string) { }

  listDocumentsAndFolders() {
    return this.requestEndpoint(Endpoint.FileList);
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
