import { validClient, expectToBe, firstRootDocumentId, title } from '../utils';

const rootFolderId = 'SEjzXLLD1wPJu9okpj-IAufv';
const folderToCreateInId = 'wZffiCj45M1twsAkE6OSg5pd';

test('Client.changeDocumentsAndFolders()', async () => {
  const response = await validClient.changeDocumentsAndFolders([{
    action: 'edit',
    type: 'document',
    file_id: firstRootDocumentId,
    title: 'Root Folder Document 1',
  }]);
  expectToBe(response._code, 'Ok');
});

test('Client.moveDocumentOrFolder()', async () => {
  const response = await validClient.moveDocumentOrFolder({
    type: 'document',
    file_id: firstRootDocumentId,
    parent_id: rootFolderId,
    index: 0,
  });
  expectToBe(response._code, 'Ok');
});

test('Client.editDocumentOrFolder()', async () => {
  const response = await validClient.editDocumentOrFolder({
    type: 'document',
    file_id: firstRootDocumentId,
    title: 'Root Folder Document 1',
  });
  expectToBe(response._code, 'Ok');
});

test('Client.createDocumentOrFolder()', async () => {
  const response = await validClient.createDocumentOrFolder({
    type: 'document',
    parent_id: folderToCreateInId,
    title,
    index: -1,
  });
  expectToBe(response._code, 'Ok');
});
