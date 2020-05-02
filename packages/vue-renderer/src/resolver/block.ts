import Vue from 'vue';
import { Block } from '@marvinrudolph/storyblok-rich-text-types';
import {
  SbDocument,
  SbHeading,
  SbParagraph,
  SbQuote,
  SbOrderedList,
  SbUnorderedList,
  SbListItem,
  SbCodeBlock,
  SbHorizontalRule,
  SbBreak,
  SbImage,
} from '../components/blocks';

export type BlockResolvers = {
  [key in Block]: typeof Vue;
};

export const defaultBlockResolvers: BlockResolvers = {
  [Block.DOCUMENT]: SbDocument,
  [Block.HEADING]: SbHeading,
  [Block.PARAGRAPH]: SbParagraph,
  [Block.QUOTE]: SbQuote,
  [Block.OL_LIST]: SbOrderedList,
  [Block.UL_LIST]: SbUnorderedList,
  [Block.LIST_ITEM]: SbListItem,
  [Block.CODE]: SbCodeBlock,
  [Block.HR]: SbHorizontalRule,
  [Block.BR]: SbBreak,
  [Block.IMAGE]: SbImage,
};
