# Link

The Link component provides a consistent way to navigate within the application or to external resources. It inherits the styling and behavior of the Text component while adding navigation capabilities. The component renders as a button by default, and as an anchor tag when an `href` is provided.

## Features

-   Renders as native `<a>` or `<button>` element depending on whether an href is provided
-   All typography styles from the Text component (h1-h6, body, caption, etc.)
-   Bold and underline styling options
-   Target control for opening in new tabs/windows
-   Disabled state for non-interactive links
-   Text truncation with ellipsis for overflow control
-   Multiple color variations for different semantic contexts
-   Customizable through overrides and classNames

## Usage

Default:

```jsx
<Link>Click me</Link>
```

H1:

```jsx
<Link type="h1">Lorem Ipsum</Link>
```

H2:

```jsx
<Link type="h2">Lorem Ipsum</Link>
```

H3:

```jsx
<Link type="h3">Lorem Ipsum</Link>
```

H4:

```jsx
<Link type="h4">Lorem Ipsum</Link>
```

H5:

```jsx
<Link type="h5">Lorem Ipsum</Link>
```

H6:

```jsx
<Link type="h6">Lorem Ipsum</Link>
```

Subtitle1:

```jsx
<Link type="subtitle1">Lorem Ipsum</Link>
```

Subtitle:

```jsx
<Link type="subtitle">Lorem Ipsum</Link>
```

Body1:

```jsx
<Link type="body1">Lorem Ipsum</Link>
```

Body:

```jsx
<Link type="body">Lorem Ipsum</Link>
```

Button:

```jsx
<Link type="button">Lorem Ipsum</Link>
```

Caption:

```jsx
<Link type="caption">Lorem Ipsum</Link>
```

CaptionMedium:

```jsx
<Link type="captionMedium">Lorem Ipsum</Link>
```

Badges:

```jsx
<Link type="badges">Lorem Ipsum</Link>
```

Overline:

```jsx
<Link type="overline">Lorem Ipsum</Link>
```

Link:

```jsx
<Link href="https://github.com/ForceManager/hoi-poi-ui" target="_blank">
    Click me
</Link>
<br />
<Link type="caption" href="https://github.com/ForceManager/hoi-poi-ui" target="_blank">
    Click me
</Link>
```

Disabled:

```jsx
<Link isDisabled>Click me</Link>
<br />
<Link type="caption" isDisabled>Click Me</Link>
```

Truncated link (only with href):

```jsx
<Link type="caption" href="https://github.com/ForceManager/hoi-poi-ui" target="_blank" isTruncated>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat sit pellentesque tempor turpis
    sed sollicitudin sit commodo. Nisi tristique etiam viverra nulla diam neque egestas. Pretium
    enim tortor, donec pharetra neque erat at sit amet.
</Link>
```

Underline:

```jsx
<Link underline>Lorem Ipsum</Link>
```

Type Variations:

```jsx
<Link variation="primary">Primary Link</Link>
```

### Component tree

---

-   root - root element
