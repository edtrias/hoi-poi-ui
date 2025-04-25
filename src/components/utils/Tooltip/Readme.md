# Tooltip

The Tooltip component displays informative text when users hover over, focus on, or tap an element. It provides contextual information or additional details about UI elements without cluttering the interface.

## Features

-   Multiple placement options (top, bottom, left, right, etc.)
-   Supports various content types (text, HTML, components)
-   Customizable appearance and behavior
-   Automatically positioned to remain within viewport
-   Works with any element as a trigger

## Usage

```jsx
import { Button } from 'hoi-poi-ui';

<div>
    <Tooltip placement="top" content={<span>Hello!</span>}>
        <Button>top</Button>
    </Tooltip>
    <span> </span>
    <Tooltip placement="bottom" content={<span>Hello!</span>}>
        <Button>bottom</Button>
    </Tooltip>
    <span> </span>
    <Tooltip placement="left" content={<span>Hello!</span>}>
        <Button>left</Button>
    </Tooltip>
    <span> </span>
    <Tooltip placement="right" content={<span>Hello!</span>}>
        <Button>right</Button>
    </Tooltip>
    <span> </span>
    <Tooltip>
        <Button>Without content</Button>
    </Tooltip>
</div>;
```

### Component tree

---

-   [root](https://github.com/react-component/tooltip)
