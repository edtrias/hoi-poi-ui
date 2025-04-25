# Radio

The Radio component is a customizable radio button control that provides a visual way for users to select a single option from a set. It features different states including checked/unchecked and enabled/disabled.

## Features

-   Simple checked/unchecked state management
-   Disabled state styling for indicating non-interactive options
-   Custom SVG icons for better visual representation
-   Smooth state transitions with built-in animations
-   Consistent styling with the design system

## Usage

States:

```jsx
<div>
    <Radio />
    <span> </span>
    <Radio checked />
    <br />
    <Radio isDisabled />
    <span> </span>
    <Radio checked isDisabled />
</div>
```

Interactive:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
function toggleState() {
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
    <Radio onChange={toggleState} checked={state.checked} />
</div>;
```

### Component tree

---

-   root - root element
-   input - Hidden native input
-   svg - icon determined by the radio state
