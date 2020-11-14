import Endpoint from './endpoint';

const API_URL = new URL('https://dynalist.io/api/v1/');

const FILE_API_URL = new URL('file/', API_URL);
const DOC_API_URL = new URL('doc/', API_URL);
const INBOX_API_URL = new URL('inbox/', API_URL);
const PREF_API_URL = new URL('pref/', API_URL);

export default {
  [Endpoint.FileList]: new URL('list', FILE_API_URL),
  [Endpoint.FileEdit]: new URL('edit', FILE_API_URL),
  [Endpoint.DocRead]: new URL('read', DOC_API_URL),
  [Endpoint.DocCheckForUpdates]: new URL('check_for_updates', DOC_API_URL),
  [Endpoint.DocEdit]: new URL('edit', DOC_API_URL),
  [Endpoint.InboxAdd]: new URL('add', INBOX_API_URL),
  [Endpoint.Upload]: new URL('upload', API_URL),
  [Endpoint.PrefGet]: new URL('get', PREF_API_URL),
  [Endpoint.PrefSet]: new URL('set', PREF_API_URL),
};
