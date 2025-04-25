# Markdown

A component that renders Markdown content as React components, providing rich text formatting with customizable styling and behavior.

## Features

-   Converts Markdown text into styled React components
-   Supports all standard Markdown syntax (headings, lists, links, etc.)
-   Customizable rendering for each Markdown element
-   Link interception for custom navigation handling
-   JSON-based custom attributes for links

## Usage

```jsx
<Markdown content="# Hello World" />
```

### Basic Example

```jsx
const markdown = `
# Heading 1
## Heading 2

- List item 1
- List item 2

[Link to Google](https://www.google.com)
`;

<Markdown content={markdown} />;
```

### Custom Link Handling

```jsx
const markdown = `
Click on this [custom link](https://example.com '{"id":"link-1","target":"_blank"}')
`;

const linkCallback = ({ attributes, link }) => {
    const { id } = attributes;
    if (id === 'link-1') {
        console.log('Custom link clicked');
        // Custom logic here
        // Call link() to execute default navigation
        link();
    } else {
        link();
    }
};

<Markdown content={markdown} linkCallback={linkCallback} />;
```

### Custom Component Overrides

```jsx
const customComponents = {
    code: ({ node, inline, className, children, ...props }) => {
        return (
            <code className="custom-code-style" {...props}>
                {children}
            </code>
        );
    },
};

<Markdown content="Use the `console.log()` function to debug." components={customComponents} />;
```

### With Style Overrides

```jsx
<Markdown
    content="# Custom Styled Heading"
    overrides={{
        h1: {
            style: {
                color: 'crimson',
                borderBottom: '1px solid #ccc',
                paddingBottom: '8px',
            },
        },
    }}
/>
```

## Component tree

---

[component-tree]

---
