# EllipsedInlineList

A component that displays an inline list of items and automatically truncates them with a "+N" indicator when they don't fit within the container width.

## Features

-   Automatically detects overflow and shows the number of hidden items
-   Responsive to container width changes
-   Customizable separator between items
-   Support for custom post-component for the truncation indicator
-   Efficient rendering with resize detection

## Usage

```jsx
<EllipsedInlineList items={['Item 1', 'Item 2', 'Item 3']} />
```

### Default

```jsx
const items = [
    'Amelia Matthews',
    'Leo Rodriguez',
    'Maya Patel',
    'Oscar Kim',
    'Alice Wong',
    'Lucas Foster',
    'Ava Thompson',
    'Gabriel Gonzalez',
    'Hazel Carter',
    'Isaac Davis',
];

<EllipsedInlineList items={items} />;
```

### Custom Separator

```jsx
const items = ['Amelia Matthews', 'Leo Rodriguez', 'Maya Patel', 'Oscar Kim', 'Alice Wong'];

<EllipsedInlineList items={items} separator=" | " />;
```

### Custom Post Component

```jsx
import { Tooltip, Text } from 'hoi-poi-ui';

const items = [
    'Amelia Matthews',
    'Leo Rodriguez',
    'Maya Patel',
    'Oscar Kim',
    'Alice Wong',
    'Lucas Foster',
    'Ava Thompson',
    'Gabriel Gonzalez',
    'Hazel Carter',
    'Isaac Davis',
];

const PostComponent = ({ count, className }) => {
    return (
        <Tooltip content={<span>See {count} more items</span>}>
            <Text color="blue500" className={className}>
                +{count}
            </Text>
        </Tooltip>
    );
};

<EllipsedInlineList items={items} postComponent={PostComponent} />;
```

## Component tree

---

[component-tree]

---
