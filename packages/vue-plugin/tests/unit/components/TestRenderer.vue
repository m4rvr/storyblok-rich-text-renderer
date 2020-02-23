<script>
import { useRenderer } from '@/plugin/renderer'

export default {
  props: {
    renderFunction: {
      type: Function,
      required: true
    },
    resolvers: {
      type: Object,
      default: () => ({})
    }
  },
  render (h) {
    const node = this.renderFunction(useRenderer(h, this._v, this.resolvers), h)
    return node instanceof Array ? <div>{node}</div> : node
  }
}
</script>
