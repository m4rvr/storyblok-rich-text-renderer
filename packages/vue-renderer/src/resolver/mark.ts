import Vue from 'vue';
import { Mark } from '@marvinrudolph/storyblok-rich-text-types';
import {
  SbBold,
  SbStrong,
  SbStrike,
  SbUnderline,
  SbItalic,
  SbCode,
  SbLink,
} from '../components/marks';

export type MarkResolvers = {
  [key in Mark]: typeof Vue;
};

export const defaultMarkResolvers: MarkResolvers = {
  [Mark.BOLD]: SbBold,
  [Mark.STRONG]: SbStrong,
  [Mark.STRIKE]: SbStrike,
  [Mark.UNDERLINE]: SbUnderline,
  [Mark.ITALIC]: SbItalic,
  [Mark.CODE]: SbCode,
  [Mark.LINK]: SbLink,
};
