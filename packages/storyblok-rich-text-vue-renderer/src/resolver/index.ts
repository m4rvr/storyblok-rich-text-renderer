import { BlockResolvers } from './block';
import { MarkResolvers } from './mark';
import { ComponentResolvers } from './component';

export * from './block';
export * from './mark';
export * from './component';

export interface Resolvers {
  blockResolvers: BlockResolvers;
  markResolvers: MarkResolvers;
  componentResolvers: ComponentResolvers;
}
