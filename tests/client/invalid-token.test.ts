import { CommonResponseWithoutLockFail } from '../../src/api-types/responses/helpers';
import { invalidClient, content, title } from '../utils';

/* eslint-disable @typescript-eslint/naming-convention */
const file_id = '111';
const parent_id = '222';
const node_id = '333';
const documentId = '444';
const action = 'create';
const type = 'document';
const index = 0;
const filename = 'file.json';
const content_type = 'application/json';
const data = 'base64encoded';
const key = 'inbox_move_position';
const value = 'bottom';
/* eslint-enable @typescript-eslint/naming-convention */

test('invalid token should result in InvalidToken code', async () => {
  const responses = await Promise.all([
    invalidClient.listDocumentsAndFolders(),
    invalidClient.changeDocumentsAndFolders([{ action, type, parent_id, index }]),
    invalidClient.moveDocumentOrFolder({ type, file_id, parent_id, index }),
    invalidClient.editDocumentOrFolder({ type, file_id, title }),
    invalidClient.createDocumentOrFolder({ type, parent_id, index }),
    invalidClient.readDocument(documentId),
    invalidClient.fetchDocumentsVersionNumbers([documentId]),
    invalidClient.fetchDocumentVersionNumber(documentId),
    invalidClient.changeDocumentContent(documentId, []),
    invalidClient.insertNode(documentId, { content, parent_id, index }),
    invalidClient.editNode(documentId, { content, node_id }),
    invalidClient.moveNode(documentId, { node_id, parent_id, index }),
    invalidClient.deleteNode(documentId, { node_id }),
    invalidClient.addToInbox({}),
    invalidClient.uploadFile({ filename, content_type, data }),
    invalidClient.getPreference(key),
    invalidClient.setPreference({ key, value }),
  ] as Promise<CommonResponseWithoutLockFail<{}>>[]);

  responses.forEach((response) => {
    expect(response._code).toBe('InvalidToken');
  });
});
