<script lang="ts">
import { createComponent, createElement as h } from '@vue/composition-api'
import { Nodes } from '@marvinrudolph/storyblok-rich-text-types'
import { useRenderer } from '../plugin/renderer'
import { Options } from '../plugin'

export default createComponent({
  name: 'rich-text-renderer',
  props: {
    document: {
      type: [Object as () => Nodes, Array as () => | Nodes[]],
      required: true
    },
    options: {
      type: Object as () => Options,
      default: () => ({})
    }
  },
  setup ({ document, options }, { root: { $richTextRenderer, _v } }) {
    const renderer = useRenderer(h, _v, { ...$richTextRenderer.options, ...options })
    const { renderNode, renderNodeList } = renderer

    if (document instanceof Array) {
      return () => h('div', renderNodeList(document))
    } else {
      return () => renderNode(document)
    }
  }
})
</script>
