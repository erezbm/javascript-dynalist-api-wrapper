const API_URL = new URL('https://dynalist.io/api/v1/');

const FILE_API_URL = new URL('file/', API_URL);
export const FILE_LIST_URL = new URL('list', FILE_API_URL);
export const FILE_EDIT_URL = new URL('edit', FILE_API_URL);

const DOC_API_URL = new URL('doc/', API_URL);
export const DOC_READ_URL = new URL('read', DOC_API_URL);
export const DOC_CHECK_FOR_UPDATES_URL = new URL('check_for_updates', DOC_API_URL);
export const DOC_EDIT_URL = new URL('edit', DOC_API_URL);

const INBOX_API_URL = new URL('inbox/', API_URL);
export const INBOX_ADD_URL = new URL('add', INBOX_API_URL);

export const UPLOAD_URL = new URL('upload', API_URL);

const PREF_API_URL = new URL('pref/', API_URL);
export const PREF_GET_URL = new URL('get', PREF_API_URL);
export const PREF_SET_URL = new URL('set', PREF_API_URL);
