import { validClient, expectToBe } from '../utils';

test('Client.addToInbox()', async () => {
  const response = await validClient.addToInbox({ content: 'added in test' });
  expectToBe(response._code, 'Ok');
  const deleteResponse = await validClient.deleteNode(response.file_id, { node_id: response.node_id });
  if (deleteResponse._code !== 'Ok') {
    // eslint-disable-next-line no-console
    console.log("Couldn't delete node added to inbox in test");
  }
});
