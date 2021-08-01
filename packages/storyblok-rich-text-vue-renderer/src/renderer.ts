import { createTextVNode, h, isVNode } from 'vue';
import {
  Node,
  isTextNode,
  isBlockNode,
  isComponentNode,
  BlockNodes,
  NodeTypes,
  MarkNodes,
  TextNode,
  ComponentNode,
  BlockNodesWithContent,
  BlockNodesWithContentAndAttributes,
  BlockNodesWithAttributes,
  BlockNodesWithoutOptions,
  MarkNodesWithoutOptions,
  MarkNodesWithAttributes,
} from '@marvr/storyblok-rich-text-types';
import { RenderedNode, Resolvers, Component } from './resolvers';
import type { MergedResolvers } from './plugin';

export function createRenderer(resolvers: MergedResolvers) {
  const renderDocument = (node: Node) => {
    if (Array.isArray(node)) return renderNodeList(node);
    return renderNode(node);
  };

  const renderNode = (node: Node) => {
    if (isTextNode(node)) {
      if (!node.marks) return renderTextNode(node);
      return node.marks.map((mark) => renderMarkNode(mark, node.text));
    } else if (isBlockNode(node)) {
      return renderBlockNode(node);
    } else if (isComponentNode(node)) {
      return renderComponentNode(node);
    }

    // @TODO
    return h('div', 'fallback node');
  };

  const renderNodeList = (nodes: Node[]) => {
    const nodeList: RenderedNode[] = [];

    nodes.forEach((node) => {
      const renderedNode = renderNode(node);

      if (Array.isArray(renderedNode)) {
        renderedNode.forEach((childNode) => {
          nodeList.push(childNode);
        });
      } else {
        nodeList.push(renderedNode);
      }
    });

    return nodeList;
  };

  const renderBlockNode = (node: BlockNodes) => {
    switch (node.type) {
      // With children only
      case NodeTypes.DOCUMENT:
      case NodeTypes.PARAGRAPH:
      case NodeTypes.QUOTE:
      case NodeTypes.UL_LIST:
      case NodeTypes.LIST_ITEM:
        return resolveBlockNodeWithContent(node);

      // With children and attributes
      case NodeTypes.HEADING:
      case NodeTypes.OL_LIST:
      case NodeTypes.CODE_BLOCK:
        return resolveBlockNodeWithContentAndAttributes(node);

      // Without options
      case NodeTypes.HR:
      case NodeTypes.BR:
        return resolveBlockNodeWithoutOptions(node);

      // With attributes only
      case NodeTypes.IMAGE:
        return resolveBlockNodeWithAttributes(node);

      default:
        // @TODO fallback
        return h('div', 'fallback block');
    }
  };

  const renderMarkNode = (node: MarkNodes, text: TextNode['text']) => {
    switch (node.type) {
      // With text only
      case NodeTypes.BOLD:
      case NodeTypes.STRONG:
      case NodeTypes.STRIKE:
      case NodeTypes.UNDERLINE:
      case NodeTypes.ITALIC:
      case NodeTypes.CODE:
        return resolveMarkNode(node, text);

      // With attributes
      case NodeTypes.LINK:
      case NodeTypes.STYLED:
        return resolveMarkNodeWithAttributes(node, text);

      default:
        // @TODO fallback
        return h('span', 'fallback mark');
    }
  };

  const renderComponentNode = (node: ComponentNode) => {
    const components: RenderedNode[] = [];

    node.attrs.body.forEach((body) => {
      const { component, _uid, ...fields } = body;
      const resolver = resolvers.components[component];

      if (resolver) {
        components.push(
          resolver({ id: node.attrs.id, component, _uid, fields }),
        );
      } else {
        components.push(resolvers[NodeTypes.COMPONENT]());
      }
    });

    return components;
  };

  const renderTextNode = (node: TextNode) => createTextVNode(node.text);

  const renderChildren = (
    node: BlockNodesWithContent | BlockNodesWithContentAndAttributes,
  ) =>
    node.content && node.content.length ? renderNodeList(node.content) : [];

  function resolveBlockNodeWithContent(node: BlockNodesWithContent) {
    const resolver = resolvers[node.type];
    const children = renderChildren(node);

    if (isComponentResolver(resolver)) {
      return h(resolver, null, { default: () => children });
    }

    return resolver({ children });
  }

  function resolveBlockNodeWithAttributes(node: BlockNodesWithAttributes) {
    const resolver = resolvers[node.type];

    if (isComponentResolver(resolver)) {
      return h(resolver, node.attrs);
    }

    return resolver({ attrs: node.attrs });
  }

  function resolveBlockNodeWithContentAndAttributes(
    node: BlockNodesWithContentAndAttributes,
  ) {
    const resolver = resolvers[node.type];
    const children = renderChildren(node);

    if (isComponentResolver(resolver)) {
      return h(resolver, node.attrs, { default: () => children });
    }

    return resolver({
      children,
      attrs: node.attrs as never,
    });
  }

  function resolveBlockNodeWithoutOptions(node: BlockNodesWithoutOptions) {
    const resolver = resolvers[node.type];

    if (isComponentResolver(resolver)) {
      return h(resolver);
    }

    return resolver();
  }

  function resolveMarkNode(
    node: MarkNodesWithoutOptions,
    text: TextNode['text'],
  ) {
    const resolver = resolvers[node.type];

    if (isComponentResolver(resolver)) {
      return h(resolver, { default: () => text });
    }

    return resolver({ text });
  }

  function resolveMarkNodeWithAttributes(
    node: MarkNodesWithAttributes,
    text: TextNode['text'],
  ) {
    const resolver = resolvers[node.type];

    if (isComponentResolver(resolver)) {
      return h(resolver, node.attrs, { default: () => text });
    }

    return resolver({ text, attrs: node.attrs as never });
  }

  return { renderDocument };
}

export function isComponentResolver(
  resolver: Resolvers[keyof Resolvers],
): resolver is Component {
  return typeof resolver !== 'function' && !isVNode(resolver);
}
