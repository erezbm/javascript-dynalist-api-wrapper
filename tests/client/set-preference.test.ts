import { validClient, expectToBe } from '../utils';

test('Client.setPreference()', async () => {
  const response = await validClient.setPreference({ key: 'inbox_move_position', value: 'bottom' });
  expectToBe(response._code, 'Ok');
});
