import Vue, { VNode } from 'vue';
import { createElement as h } from '@vue/composition-api';
import {
  Node,
  Block,
  BlockNode,
  Mark,
  MarkNode,
  ComponentNode,
} from '@marvinrudolph/storyblok-rich-text-types';
import {
  defaultBlockResolvers,
  defaultMarkResolvers,
  defaultComponentResolvers,
  Resolvers,
} from '../resolver';
import {
  isBlockNode,
  isBlockNodeWithContent,
  isTextNode,
  isComponentNode,
} from '../utils';
import { Options } from '..';

export function useRenderer(options: Options = {}) {
  const resolvers: Resolvers = {
    blockResolvers: {
      ...defaultBlockResolvers,
      ...options?.resolvers?.blocks,
    },
    markResolvers: {
      ...defaultMarkResolvers,
      ...options?.resolvers?.marks,
    },
    componentResolvers: {
      ...defaultComponentResolvers,
      ...options?.resolvers?.components,
    },
  };

  function addKeyToNode(node: VNode, key: number) {
    if (!node.key) {
      node.key = key;
    }

    return node;
  }

  function renderBlockNode(node: BlockNode) {
    const { blockResolvers } = resolvers;
    const resolver = blockResolvers[node.type as Block];
    const attrs = node.attrs || {};

    if (isBlockNodeWithContent(node)) {
      const children = node.content ? renderNodeList(node.content) : [];
      return h(resolver, { props: { attrs } }, children);
    } else {
      return h(resolver, { props: { attrs } });
    }
  }

  function renderComponentNode(node: ComponentNode) {
    const { componentResolvers } = resolvers;
    const components: VNode[] = [];

    node.attrs.body.forEach((body) => {
      const { component } = body;
      const resolver =
        componentResolvers[component] || componentResolvers._fallback;

      components.push(h(resolver, { props: { body } }));
    });

    return components;
  }

  function renderTextNode(text: string): VNode {
    return Vue.prototype._v(text);
  }

  function renderMarkNode(text: VNode, node: MarkNode) {
    const { markResolvers } = resolvers;
    const resolver = markResolvers[node.type as Mark];
    const attrs = node.attrs || {};

    return h(resolver, { props: { attrs } }, [text]);
  }

  function renderNode(node: Node) {
    if (isTextNode(node)) {
      if (!node.marks) {
        return renderTextNode(node.text);
      }

      return node.marks.reduce((value: VNode, mark: MarkNode) => {
        return renderMarkNode(value, mark);
      }, renderTextNode(node.text));
    } else if (isBlockNode(node)) {
      return renderBlockNode(node);
    } else if (isComponentNode(node)) {
      return renderComponentNode(node);
    }

    return renderTextNode('');
  }

  function renderNodeList(nodes: Node[]) {
    const nodeList: VNode[] = [];

    nodes.forEach((node, index) => {
      const renderedNode = renderNode(node);

      if (renderedNode instanceof Array) {
        renderedNode.forEach((childNode, childIndex) => {
          nodeList.push(addKeyToNode(childNode, index + childIndex));
        });
      } else {
        nodeList.push(addKeyToNode(renderedNode, index));
      }
    });

    return nodeList;
  }

  function renderDocument(richTextDocument: Node | Node[]) {
    if (Array.isArray(richTextDocument)) {
      return renderNodeList(richTextDocument);
    }

    return renderNode(richTextDocument);
  }

  return {
    renderDocument,
  };
}
