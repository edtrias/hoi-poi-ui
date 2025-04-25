# Menus

A dropdown menu component that displays a list of options when triggered by click or hover interactions.

## Features

-   Two trigger modes: click or hover
-   Support for icons in trigger and menu items
-   Customizable menu widths with three size presets
-   Item separators with divider option
-   Support for non-clickable informational items
-   Customizable styling through overrides
-   Support for item descriptions

## Usage

### Basic Menu (Click Trigger)

```jsx
import { Icon, Text } from 'hoi-poi-ui';

const items = [
    {
        title: <Text bold>Bruce Wayne</Text>,
        infoItem: true,
        icon: <Icon name="emptyAvatar" size="medium" color="#a9b1b9" />,
    },
    {
        title: <Text>Edit</Text>,
        icon: <Icon name="edit" color="#a9b1b9" />,
        onClick: () => console.log('edit'),
    },
    { divider: true },
    {
        title: <Text>Delete</Text>,
        icon: <Icon name="delete" color="#a9b1b9" />,
        onClick: () => console.log('delete'),
    },
];

<Menus title={<Text>Click me</Text>} icon={<Icon name="threeDots" />} items={items} />;
```

### Hover Trigger Menu

```jsx
import { Icon, Text } from 'hoi-poi-ui';

const items = [
    {
        title: <Text>Create</Text>,
        icon: <Icon name="add" />,
        onClick: () => console.log('create'),
    },
    {
        title: <Text>Edit</Text>,
        icon: <Icon name="edit" />,
        onClick: () => console.log('edit'),
    },
    {
        title: <Text>Delete</Text>,
        icon: <Icon name="delete" />,
        onClick: () => console.log('delete'),
    },
];

<Menus title={<Text>Hover me</Text>} items={items} triggerAction="hover" />;
```

### Menu with Item Descriptions

```jsx
import { Icon, Text } from 'hoi-poi-ui';

const items = [
    {
        title: <Text type="body">Create</Text>,
        description: <Text type="caption">Create a new item in the system</Text>,
        icon: <Icon name="add" />,
        onClick: () => console.log('create'),
    },
    {
        title: <Text type="body">Edit</Text>,
        description: <Text type="caption">Modify the selected item's properties</Text>,
        icon: <Icon name="edit" />,
        onClick: () => console.log('edit'),
    },
];

<Menus title={<Text>Actions</Text>} items={items} />;
```

### Custom Size Menu

```jsx
import { Icon, Text } from 'hoi-poi-ui';

const items = [
    {
        title: <Text>Small option 1</Text>,
        onClick: () => console.log('option 1'),
    },
    {
        title: <Text>Small option 2</Text>,
        onClick: () => console.log('option 2'),
    },
];

<Menus title={<Text>Size</Text>} items={items} size="small" />;
```
