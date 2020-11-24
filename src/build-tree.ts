import { Id } from './api-types';

export type ArrayNode<T> = T & {
  id: Id;
  children?: Id[];
};

export type TreeNode<T> = T & {
  id: Id;
  children?: TreeNode<T>[];
};

/**
 * Converts an array of nodes which have an id and their children's ids, to a tree.
 * The root is the node with the id `rootId`. If it doesn't exist return null.
 */
export default function buildTree<T>(arrayNodes: readonly ArrayNode<T>[], rootId: Id) {
  if (!arrayNodes.some(({ id }) => id === rootId)) return null;

  const idToArrayNode: Record<Id, ArrayNode<T>> = {};
  arrayNodes.forEach((node) => { idToArrayNode[node.id] = node; });

  return internalBuildTree(idToArrayNode, rootId);
}

function internalBuildTree<T>(idToArrayNode: Record<Id, ArrayNode<T>>, rootId: Id): TreeNode<T> {
  const rootNode = idToArrayNode[rootId];
  return !rootNode.children ? rootNode as TreeNode<T> : {
    ...rootNode,
    ...{ children: rootNode.children.map((id) => internalBuildTree(idToArrayNode, id)) },
  };
}
