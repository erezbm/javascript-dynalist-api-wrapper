export default class APIError extends Error {
  constructor(public _code: string, public _msg: string) {
    super(_msg);
    this.name = 'APIError';
  }
}
