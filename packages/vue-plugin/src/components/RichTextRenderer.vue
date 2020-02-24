<script lang="ts">
import Vue, { VNode } from 'vue'
import { Nodes } from '@marvinrudolph/storyblok-rich-text-types'
import { useRenderer } from '../plugin/renderer'
import { Options } from '../plugin'

export default Vue.extend({
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
  render (h) {
    const renderer = useRenderer(h, this._v, { ...this.$richTextRenderer.options, ...this.options })
    const { renderNode, renderNodeList } = renderer

    if (document instanceof Array) {
      return h('div', renderNodeList(this.document as Nodes[])) as VNode
    } else {
      return renderNode(this.document as Nodes) as VNode
    }
  }
})
</script>
