# Popover

The Popover component displays content in a floating container activated by user interaction (click, hover) with a trigger element. It's useful for displaying additional information, menus, or controls without requiring navigation to a new page.

## Features

-   Triggered by various user interactions (click, hover, focus, etc.)
-   Multiple placement options around the trigger element
-   Flexible content support (text, HTML, React components)
-   Automatic positioning to remain within viewport
-   Customizable styling and transitions

## Usage

```jsx
import { Button } from 'hoi-poi-ui';

<div>
    <Popover placement="top" content={<span>Hello!</span>}>
        <Button>top</Button>
    </Popover>
    <span> </span>
    <Popover placement="bottom" content={<span>Hello!</span>}>
        <Button>bottom</Button>
    </Popover>
    <span> </span>
    <Popover placement="left" content={<span>Hello!</span>}>
        <Button>left</Button>
    </Popover>
    <span> </span>
    <Popover placement="right" content={<span>Hello!</span>}>
        <Button>right</Button>
    </Popover>
</div>;
```

### Component tree

---

-   [root](https://github.com/react-component/Tooltip)
