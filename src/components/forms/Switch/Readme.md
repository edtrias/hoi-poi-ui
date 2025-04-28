# Switch

The Switch component provides a toggle control for binary states (on/off). It offers a visual slider that the user can toggle to change a setting between two states.

## Features

-   Three size options (small, medium, large)
-   Support for checked/unchecked states
-   Hover state visual feedback
-   Disabled state with different styling for on/off positions
-   Customizable colors through theming

## Usage

States:

```jsx
<div>
    <Switch size="small" checked />
    <br />
    <Switch size="medium" />
    <br />
    <Switch size="large" checked />
    <br />
    <br />
    <Switch size="small" checked isDisabled />
    <br />
    <Switch size="medium" isDisabled />
    <br />
    <Switch size="large" checked isDisabled />
</div>
```

Interactive:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});

function toggleState(st) {
    if (state.checked) {
        setState({
            checked: false,
        });
    } else {
        setState({
            checked: true,
        });
    }
}

<div>
    <Switch size="small" onClick={toggleState} onChange={toggleState} checked={state.checked} />
</div>;
```

### Component tree

---

-   root - root element
-   [Switch](https://github.com/markusenglund/react-switch)
