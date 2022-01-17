import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { DocumentNode } from '@marvr/storyblok-rich-text-types'
import { useRenderer } from '..'

export default defineComponent({
  name: 'RichTextRenderer',
  props: {
    document: {
      type: Object as PropType<DocumentNode>,
      required: true,
    },
  },
  setup(props) {
    const renderer = useRenderer()
    return () => renderer.renderDocument(props.document)
  },
})
