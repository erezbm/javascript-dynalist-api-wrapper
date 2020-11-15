import { validClient, expectToBe } from '../utils';

test('Client.listDocumentsAndFolders()', async () => {
  const response = await validClient.listDocumentsAndFolders();
  expectToBe(response._code, 'Ok');
  expect(response.root_file_id).toBeDefined();
  expect(response.files).toBeDefined();
});
