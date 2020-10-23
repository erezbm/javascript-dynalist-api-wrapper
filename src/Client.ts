import APIError from './APIError';
import { FILE_LIST_URL } from './constants/api';

export default class Client {
  constructor(private token: string) { }

  public async listDocumentsAndFolders() {
    return this.requestEndpoint(FILE_LIST_URL);
  }

  private async requestEndpoint(endpoint: URL, requestData?: object) {
    const response = await fetch(endpoint.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.token,
        ...requestData,
      }),
    });
    const responseData = await response.json();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _code, _msg } = responseData;
    if (!_code) throw new Error("Missing field '_code'");
    if (_code !== 'OK') throw new APIError(_code, _msg);

    return responseData;
  }
}
