# Storyblok Rich-Text Renderer :zap:

[![Build Status](https://circleci.com/gh/MarvinRudolph/storyblok-rich-text-renderer.svg?&style=shield)](https://circleci.com/gh/MarvinRudolph/storyblok-rich-text-renderer)
[![Release](https://badgen.net/github/release/MarvinRudolph/storyblok-rich-text-renderer)](https://badgen.net/github/release/MarvinRudolph/storyblok-rich-text-renderer)

The **easy** and **fast** renderer for your Storyblok rich-text content! :muscle:

## Status :warning:

Currently in an early state but it's intended to make it production ready.

## Why does this exist :question:

Storyblok has it's own [rich-text renderer](https://www.storyblok.com/docs/richtext-field#how-to-render-richtext-data-to-html) but for that you need the Vue.js runtime compiler (which increases your bundle size) and the configuration is a bit difficult.
That's why I've created this renderer to simply render your content without all the configuration stuff and without the Vue.js runtime compiler.
You can still configure every available node by overriding it with your custom component and also supports your custom Storyblok components. :blush:

**Hold your beer :beer::**

With the separate types package you know exactly which node has which attributes available. :astonished:

## Packages :package:

**[@marvr/storyblok-rich-text-types](./packages/storyblok-rich-text-types):**

Type definitions for every node

**[@marvr/storyblok-rich-text-vue-renderer](./packages/storyblok-rich-text-vue-renderer):**

Vue.js plugin for rendering the rich-text content

## Features :sparkles:

- No runtime compiler
- Easy configurable
- Shipped with defaults
- Supports custom Storyblok components
- Fast by default
- Written in TypeScript

## Documentation :notebook_with_decorative_cover:

The full documentation can be found [here](https://storyblok-rich-text-renderer.netlify.com/).
