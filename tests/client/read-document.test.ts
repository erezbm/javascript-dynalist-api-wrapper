import { validClient, expectToBe, validDocumentId } from '../utils';

test('Client.readDocument()', async () => {
  const response = await validClient.readDocument(validDocumentId);
  expectToBe(response._code, 'Ok');
});
