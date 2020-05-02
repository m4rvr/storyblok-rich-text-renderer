<script lang="ts">
import Vue from 'vue';
import { useRenderer } from '../composables/useRenderer';
import { Node } from '@marvinrudolph/storyblok-rich-text-types';
import { Options } from '..';

export default Vue.extend({
  functional: true,
  props: {
    document: {
      type: Object as () => Node | Node[],
      required: true,
    },
    options: {
      type: Object as () => Options,
      default: () => ({}),
    },
  },
  render(h, { props }) {
    const options = {
      ...Vue.prototype.$richTextRenderer,
      ...props.options,
    };
    const { renderDocument } = useRenderer(options);
    return renderDocument(props.document);
  },
});
</script>
