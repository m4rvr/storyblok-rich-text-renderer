import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import { VNode, CreateElement } from 'vue'
import { Nodes } from '@marvinrudolph/storyblok-rich-text-types'
import TestRenderer from './components/TestRenderer.vue'
import { useRenderer } from '../../src/plugin/renderer'
import {
  heading,
  paragraph,
  paragraphWithMarks,
  paragraphWithInvalidMarks,
  paragraphWithMultipleMarks,
  paragraphWithLink,
  quote,
  orderedList,
  unorderedList,
  codeBlock,
  hr,
  br,
  image,
  document,
  emptyDocument,
  invalidNode,
  component
} from './nodes'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('Renderer', () => {
  function useWrapper (renderFunction: (renderer: ReturnType<typeof useRenderer>, h: CreateElement) => VNode | VNode[]) {
    return shallowMount(TestRenderer, {
      localVue,
      propsData: {
        renderFunction
      }
    })
  }

  function renderNode (node: any) {
    return useWrapper(({ renderNode }) => renderNode(node))
  }

  function renderNodeList (nodes: Nodes[]) {
    return useWrapper(({ renderNodeList }, h) => {
      return <div>{renderNodeList(nodes)}</div>
    })
  }

  const nodes = [heading, paragraph, quote, orderedList, unorderedList, codeBlock, hr, br, image]

  it('renders document', () => {
    expect(renderNode(document).html()).toMatchSnapshot()
  })

  // Render simple nodes
  nodes.forEach((node) => {
    it(`renders ${node.type} with default resolvers`, () => {
      expect(renderNode(node).html()).toMatchSnapshot()
    })
  })

  it('renders node list', () => {
    expect(renderNodeList(nodes).html()).toMatchSnapshot()
  })

  it('renders paragraph containing marks with default resolvers', () => {
    expect(renderNode(paragraphWithMarks).html()).toMatchSnapshot()
  })

  it('renders an empty div when given an empty document', () => {
    expect(renderNode(emptyDocument).html()).toEqual('<div></div>')
  })

  it('renders empty string if type is invalid', () => {
    expect(renderNode(invalidNode).html()).toMatchSnapshot()
  })

  it('does not render mark with invalid type', () => {
    expect(renderNode(paragraphWithInvalidMarks).html()).toMatchSnapshot()
  })

  it('renders with multiple marks', () => {
    expect(renderNode(paragraphWithMultipleMarks).html()).toMatchSnapshot()
  })

  it('renders link', () => {
    expect(renderNode(paragraphWithLink).html()).toMatchSnapshot()
  })

  it('renders components', () => {
    expect(renderNode(component).html()).toMatchSnapshot()
  })
})
