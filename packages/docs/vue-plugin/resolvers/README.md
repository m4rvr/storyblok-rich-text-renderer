# Resolvers

::: tip Usage with JSX/TSX
If your app supports JSX/TSX you don't have to use the `h` render function in most cases.
You can directly return JSX/TSX like [here](#document) or [here](#heading).

**It's important to leave the `h` in the arguments because it's needed for rendering in the background.**
:::

## Blocks

### Block Definitions

#### DOCUMENT

Top-level node which holds all other nodes.

- Key: `Block.DOCUMENT` | `doc`
- Type: `function`
- Default:
``` jsx
(h, children) => <div>{children}</div>
```

#### HEADING

Resolves headings from h1 to h6.

- Key: `Block.HEADING` | `heading`
- Type: `function`
- Default:
``` jsx
(h, children, node) => {
  const Tag = `h${node.attrs.level}`
  return <Tag>{children}</Tag>
}
```

#### PARAGRAPH

Resolves paragraphs.

- Key: `Block.PARAGRAPH` | `paragraph`
- Type: `function`
- Default:
``` jsx
(h, children) => <p>{children}</p>
```

#### QUOTE

Resolves block quotes.

- Key: `Block.QUOTE` | `blockquote`
- Type: `function`
- Default:
``` jsx
(h, children) => <blockquote>{children}</blockquote>
```

#### OL_LIST

Resolves ordered lists.

- Key: `Block.OL_LIST` | `ordered_list`
- Type: `function`
- Default:
``` jsx
(h, children) => <ol>{children}</ol>
```

#### UL_LIST

Resolves unordered lists.

- Key: `Block.UL_LIST` | `bullet_list`
- Type: `function`
- Default:
``` jsx
(h, children) => <ul>{children}</ul>
```

#### LIST_ITEM

Resolves list items.

- Key: `Block.LIST_ITEM` | `list_item`
- Type: `function`
- Default:
``` jsx
(h, children) => <li>{children}</li>
```

#### CODE

Resolves code blocks.

- Key: `Block.CODE` | `code_block`
- Type: `function`
- Default:
``` jsx
(h, children, node) => <pre class={node.attrs.class}><code>{children}</code></pre>
```

#### HR

Resolves horizontal rules.

- Key: `Block.HR` | `horizontal_rule`
- Type: `function`
``` jsx
(h) => <hr />
```

#### BR

Resolves hard breaks.

- Key: `Block.BR` | `hard_break`
- Type: `function`
``` jsx
(h) => <br />
```

#### IMAGE

Resolves images.

- Key: `Block.IMAGE` | `image`
- Type: `function`
- Default:
``` js
(h, node) => {
  const { alt, src, title } = node.attrs
  return <img src={src} alt={alt} title={title} />
}
```

### Block Resolver Function

Resolver function for all block elements.

- Parameters:

| Name | Type | Description |
|:------------- |:------------- |:----- |
| `h` | `function` | `createElement` rendering function from Vue passed in. |
| `children` | `array` | `VNode` array with the children of the node. |
| `node` | `object` | The node object of the current rich-text node. |

### Void Block Resolver Function

Resolver function for void elements e.g. elements without content or children like [IMAGE](#image), [BR](#br) and [HR](#hr).
The only difference between this function and the [normal](#block-resolver-function) one is that you don't have a `children` parameter — because there aren't any. :yum:

- Parameters:

| Name | Type | Description |
|:------------- |:------------- |:----- |
| `h` | `function` | `createElement` rendering function from Vue passed in. |
| `node` | `object` | The node object of the current rich-text node. |


## Marks

### Mark Definitions

#### BOLD

Resolves bold marks.

- Key: `Mark.BOLD` | `bold`
- Type: `function`

#### STRONG

Resolves strong marks.

- Key: `Mark.STRONG` | `strong`
- Type: `function`

#### STRIKE

Resolves strike marks.

- Key: `Mark.STRIKE` | `strike`
- Type: `function`

#### UNDERLINE

Resolves underline marks.

- Key: `Mark.UNDERLINE` | `underline`
- Type: `function`

#### ITALIC

Resolves italic marks.

- Key: `Mark.ITALIC` | `italic`
- Type: `function`

#### CODE

Resolves inline code marks.

- Key: `Mark.CODE` | `code`
- Type: `function`

#### LINK

Resolves links (story, asset & external).

- Key: `Mark.LINK` | `link`
- Type: `function`

### Mark Resolver Function

- Parameters:

| Name | Type | Description |
|:------------- |:------------- |:----- |
| `h` | `function` | `createElement` rendering function from Vue passed in. |
| `text` | `object` | The text node. It's **not** a string but a Vue `VNode` so it can be rendered as a child. |
| `node` | `object` | The mark node object. |

## Component Resolver(s)

### Component Definitions

#### [YOUR COMPONENT NAME]

Each entry defines the resolver for the component where the key is the technical name of your Storyblok component.
You find that name in your component's schema config.

::: warning
You can also directly set the imported component as the value of the key but **no data** from Storyblok will be passed.
If you want to pass a field from Storyblok to the component (as a prop), the resolver has to be a [function](#component-resolver-function) where you have access to your component's data.
:::

**See following examples below:** :point_down:

Imported component directly as the resolver:
``` jsx
import MyComponent from './components/MyComponent.vue'

{
  'my-component': MyComponent
}
```

Component receives data as a prop from Storyblok:
``` jsx
import MyComponent from './components/MyComponent.vue'

{
  'my-component': (h, body) => h(
    MyComponent, 
    { 
      props: {
        myDataFromStoryblok: body.fieldInTheSchema 
      }
    }
  )
}
```

#### DEFAULT

Will be used if no resolver definition could be found for your custom component.

- Key: `_default`
- Type: `function` | `Vue Component`
- Default:
``` jsx
(h, body) => <div>No rendering definition for component <strong>{body.component}</strong> found.</div>
```

### Component Resolver Function

- Parameters:

| Name | Type | Description |
|:------------- |:------------- |:----- |
| `h` | `function` | `createElement` rendering function from Vue passed in. |
| `body` | `object` | Properties of your component. Contains basic fields like `uid` or `component` (component name). |
| `node` | `object` | Actual node in the rich-text which holds your components. It's the wrapper and probably not needed but there if you need it. :yum: |

- Example:
``` jsx
import MyComponent from './components/MyComponent.vue'

(h, body, node) => h(MyComponent)
```
