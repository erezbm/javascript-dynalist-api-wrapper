import { validClient, expectToBe, validDocumentId, content } from '../utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
const node_id = 'FxQBqoB8Lsu1B6W7rkKfJ9p-';

test('Client.changeDocumentContent()', async () => {
  const response = await validClient.changeDocumentContent(validDocumentId, [{ action: 'edit', node_id, heading: 1 }]);
  expectToBe(response._code, 'Ok');
});

test('Client.editNode()', async () => {
  const response = await validClient.editNode(validDocumentId, { node_id, heading: 1 });
  expectToBe(response._code, 'Ok');
});

test('Client.moveNode()', async () => {
  const response = await validClient.moveNode(validDocumentId, { node_id, parent_id: 'root', index: 0 });
  expectToBe(response._code, 'Ok');
});

test('Client.insertNode() + Client.deleteNode()', async () => {
  const insertResponse = await validClient.insertNode(validDocumentId, { parent_id: 'root', content, index: -1 });
  expectToBe(insertResponse._code, 'Ok');
  const deleteResponse = await validClient.deleteNode(validDocumentId, { node_id: insertResponse.new_node_id });
  expectToBe(deleteResponse._code, 'Ok');
});
