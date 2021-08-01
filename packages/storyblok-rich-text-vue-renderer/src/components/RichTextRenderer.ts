import { defineComponent, PropType } from 'vue';
import { DocumentNode } from '@marvr/storyblok-rich-text-types';
import { useRenderer } from '../plugin';

export default defineComponent({
  name: 'RichTextRenderer',
  props: {
    document: {
      type: Object as PropType<DocumentNode>,
      required: true,
    },
  },
  setup(props) {
    const renderer = useRenderer();
    return () => renderer.renderDocument(props.document);
  },
});
