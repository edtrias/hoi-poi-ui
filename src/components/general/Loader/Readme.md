# Loader

A simple, customizable spinner component that provides visual feedback during loading states and asynchronous operations.

## Features

-   Eight size variants from mini to massive
-   Four color options to match different UI contexts
-   Lightweight CSS-based animation
-   Easy to implement in any container
-   No external dependencies

## Usage

```jsx
<Loader />
```

### Default

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <Loader />
    <Loader color="actionMinor" />
    <Loader color="danger" />
    <div style={{ background: 'black', padding: '10px' }}>
        <Loader color="white" />
    </div>
</div>
```

### Size Variants

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <Loader size="mini" />
    <Loader size="tiny" />
    <Loader size="small" />
    <Loader size="medium" />
    <Loader size="large" />
    <Loader size="big" />
    <Loader size="huge" />
    <Loader size="massive" />
</div>
```

### Color Variations

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
        <h4>Primary (default)</h4>
        <Loader color="primary" size="medium" />
    </div>
    <div>
        <h4>Action Minor</h4>
        <Loader color="actionMinor" size="medium" />
    </div>
    <div>
        <h4>Danger</h4>
        <Loader color="danger" size="medium" />
    </div>
    <div style={{ background: 'black', padding: '10px', display: 'inline-block' }}>
        <h4 style={{ color: 'white' }}>White (for dark backgrounds)</h4>
        <Loader color="white" size="medium" />
    </div>
</div>
```

## Component tree

---

[component-tree]

---
