import { validClient, expectToBe } from '../utils';

test('Client.getPreference()', async () => {
  const response = await validClient.getPreference('inbox_move_position');
  expectToBe(response._code, 'Ok');
});
