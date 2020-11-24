import buildTree, { ArrayNode } from '../src/build-tree';

it('buildTree()', () => {
  expect(buildTree([], 'non-existent')).toBeNull();

  const array: readonly ArrayNode<{ someStuff?: number; }>[] = [
    {
      id: '0',
      someStuff: 0,
      children: ['1', '2', '3'],
    },
    {
      id: '1',
      someStuff: 1,
    },
    {
      id: '2',
      someStuff: 2,
      children: ['4'],
    },
    { id: '3' },
    { id: '4' },
  ];
  const expectedTree = {
    id: '0',
    someStuff: 0,
    children: [
      {
        id: '1',
        someStuff: 1,
      },
      {
        id: '2',
        someStuff: 2,
        children: [
          { id: '4' },
        ],
      },
      { id: '3' },
    ],
  } as const;
  expect(buildTree(array, '0')).toEqual(expectedTree);
});
