import { CommonResponseWithoutLockFail } from '../../src/api-types/responses/helpers';
import { invalidClient } from '../utils';

test('invalid token should result in InvalidToken code', async () => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const file_id = '111';
  const parent_id = '222';
  const node_id = '333';
  /* eslint-enable @typescript-eslint/naming-convention */
  const documentId = '444';
  const action = 'create';
  const type = 'document';
  const index = 0;
  const content = 'content';

  const responses = await Promise.all([
    invalidClient.listDocumentsAndFolders(),
    invalidClient.changeDocumentsAndFolders([{ action, type, parent_id, index }]),
    invalidClient.moveDocumentOrFolder({ type, file_id, parent_id, index }),
    invalidClient.editDocumentOrFolder({ type, file_id, title: 'title' }),
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
    invalidClient.uploadFile({ filename: 'file.json', content_type: 'application/json', data: 'base64encoded' }),
    invalidClient.getPreference('inbox_move_position'),
    invalidClient.setPreference({ key: 'inbox_move_position', value: 'bottom' }),
  ] as Promise<CommonResponseWithoutLockFail<{}>>[]);

  responses.forEach((response) => {
    expect(response._code).toBe('InvalidToken');
  });
});
