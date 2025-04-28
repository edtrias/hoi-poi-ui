# IconMultiple

The IconMultiple component displays two icons together in a layered composition, with the second icon positioned at the bottom-right corner of the first icon. This is useful for indicating combined actions or states.

## Features

-   Displays two icons in a layered composition
-   Supports all icon types from the Icon component
-   Offers multiple size options (medium, large, big, huge)

## Usage

```jsx
import IconMultiple from './index';

<div style={{ display: 'flex', flexFlow: 'row wrap', gap: 4, alignItems: 'flex-end' }}>
    <IconMultiple firstIcon="opportunities" secondIcon="addCircle" size="huge" />
    <IconMultiple firstIcon="opportunities" secondIcon="addCircle" size="big" />
    <IconMultiple firstIcon="opportunities" secondIcon="addCircle" size="large" />
    <IconMultiple firstIcon="opportunities" secondIcon="addCircle" size="medium" />
</div>;
```

Various icon combinations:

```jsx
import IconMultiple from './index';

<div style={{ display: 'flex', flexFlow: 'row wrap', gap: 4, alignItems: 'flex-end' }}>
    <IconMultiple firstIcon="fields" secondIcon="add" size="large" />
    <IconMultiple firstIcon="accounts" secondIcon="clockFilled" size="large" />
    <IconMultiple firstIcon="apps" secondIcon="comment" size="large" />
    <IconMultiple firstIcon="brightnessHight" secondIcon="contentCopy" size="large" />
    <IconMultiple firstIcon="externalApps" secondIcon="cron" size="large" />
</div>;
```

### Component tree

---

-   root - root element
-   FirstIcon - First icon
-   SecondIcon - Second icon
