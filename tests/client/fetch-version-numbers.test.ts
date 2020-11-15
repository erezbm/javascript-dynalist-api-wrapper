import { expectToBe, validClient } from '../utils';

const ids = ['ZYvRKBhl2xUTAkhUOpcLfwz7', 'non-existent document id'] as const;

test('Client.fetchDocumentsVersionNumbers()', async () => {
  const response = await validClient.fetchDocumentsVersionNumbers(ids);
  expectToBe(response._code, 'Ok');
  expect(typeof response.versions[ids[0]]).toBe('number');
  expect(response.versions[ids[1]]).toBeUndefined();
});

test('Client.fetchDocumentVersionNumber()', async () => {
  const existentResponse = await validClient.fetchDocumentVersionNumber(ids[0]);
  expectToBe(existentResponse._code, 'Ok');
  expect(typeof existentResponse.version).toBe('number');

  const nonExistentResponse = await validClient.fetchDocumentVersionNumber(ids[1]);
  expectToBe(nonExistentResponse._code, 'Ok');
  expect(nonExistentResponse.version).toBeUndefined();
});
