# Breadcrumbs

The Breadcrumbs component displays a hierarchy of links that helps users understand their current location within the application and navigate to parent pages or sections.

## Features

-   Shows the navigation path in a hierarchical structure
-   Support for clickable items with custom click handlers
-   Automatically adds separators between items
-   Responsive design that adapts to available space

## Usage

Default:

```jsx
const items = [
    {
        id: 'level1',
        text: 'Level 1',
    },
    {
        id: 'level2',
        text: 'Level 2',
    },
    {
        id: 'level3',
        text: 'Level 3',
    },
    {
        id: 'level4',
        text: 'Level 4',
    },
];
<Breadcrumbs items={items} />;
```

Clickable:

```jsx
const items = [
    {
        id: 'level1',
        text: 'Level 1',
    },
    {
        id: 'level2',
        text: 'Level 2',
    },
    {
        id: 'level3',
        text: 'Level 3',
    },
    {
        id: 'level4',
        text: 'Level 4',
    },
];
<Breadcrumbs onClick={(item) => alert(JSON.stringify(item, null, 4))} items={items} />;
```

### Component tree

---

-   root
-   item
-   divider
-   [Text](#/Typography?id=text)
