# List

A component that renders a collection of items as an ordered, unordered, or unstyled list with customizable styling options.

## Features

-   Support for ordered (numbered) lists
-   Support for unordered (bulleted) lists
-   Ability to replace bullets with custom icons
-   Option to remove all list markers
-   Consistent text styling for list items
-   Customizable via overrides system

## Usage

### Default (Unordered List)

```jsx
const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Aenean euismod elementum nisi quis eleifend quam adipiscing.',
    'Aliquet porttitor lacus luctus accumsan tortor posuere ac.',
    'In fermentum posuere urna nec tincidunt.',
    'Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.',
];

<List items={items} />;
```

### Ordered List

```jsx
const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Aenean euismod elementum nisi quis eleifend quam adipiscing.',
    'Aliquet porttitor lacus luctus accumsan tortor posuere ac.',
    'In fermentum posuere urna nec tincidunt.',
    'Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.',
];

<List items={items} type="ordered" />;
```

### Unstyled List

```jsx
const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Aenean euismod elementum nisi quis eleifend quam adipiscing.',
    'Aliquet porttitor lacus luctus accumsan tortor posuere ac.',
    'In fermentum posuere urna nec tincidunt.',
    'Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.',
];

<List items={items} unStyled />;
```

### Custom Icon Bullets

```jsx
const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Aenean euismod elementum nisi quis eleifend quam adipiscing.',
    'Aliquet porttitor lacus luctus accumsan tortor posuere ac.',
    'In fermentum posuere urna nec tincidunt.',
    'Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.',
];

<List items={items} bullet="arrowRight" />;
```

## Component tree

---

[component-tree]

---
