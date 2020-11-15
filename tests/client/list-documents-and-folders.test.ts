import { validClient, expectToBe } from '../utils';

it('with valid token should succeed', async () => {
  const response = await validClient.listDocumentsAndFolders();
  expectToBe(response._code, 'Ok');
  expect(response.root_file_id).toBeDefined();
  expect(response.files).toBeDefined();
});
