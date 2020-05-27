import Vue from 'vue';
import SbComponentFallback from '../components/ComponentFallback.vue';

export interface ComponentResolvers {
  _fallback: typeof Vue;
  // @TODO: Don't allow `undefined` - any idea?
  [key: string]: typeof Vue | undefined;
}

export const defaultComponentResolvers: ComponentResolvers = {
  _fallback: SbComponentFallback,
};
