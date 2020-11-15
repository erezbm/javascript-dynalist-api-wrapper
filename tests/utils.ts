import { config } from 'dotenv';
import { Client } from '../src';

config({ path: '.env.test' });

export const validClient = new Client(process.env.DYNALIST_API_TOKEN!);
export const invalidClient = new Client('');

type Narrowable = string | number | boolean | symbol | object | null | undefined | void | {};

export function expectToBe<T extends Narrowable, U extends T>(
  actual: T,
  expected: U,
): asserts actual is U {
  expect(actual).toBe(expected);
}

export const validDocumentId = 'ZYvRKBhl2xUTAkhUOpcLfwz7';
export const firstRootDocumentId = validDocumentId;
export const content = '[From Unit Test] Content here';
export const title = '[From Unit Test] Title here';
