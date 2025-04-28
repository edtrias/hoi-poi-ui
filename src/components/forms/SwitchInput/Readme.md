# SwitchInput

The SwitchInput component combines a Switch toggle with an InputWrapper to create a fully featured form control. It provides a toggle switch with label, error states, and additional information support, making it suitable for boolean inputs in forms.

## Features

-   Label support with both horizontal and vertical orientations
-   Toggle switch for boolean value selection
-   Error state handling with error message display
-   Info/hint text support for additional context
-   Read-only mode for disabled interactions
-   Full width layout support
-   Consistent form control styling

## Usage

States:

```jsx
<div>
    <SwitchInput label="Lorem Ipsum" />
    <span> </span>
    <SwitchInput label="Lorem Ipsum" value={true} info="Info text here" />
    <span> </span>
    <SwitchInput label="Lorem Ipsum" isReadOnly error="Error text here" />
    <span> </span>
    <SwitchInput label="Lorem Ipsum" value={true} isReadOnly />
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
    <SwitchInput label="Lorem Ipsum" onChange={toggleState} value={state.checked} />
</div>;
```

Vertical

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
    <SwitchInput
        label="Lorem Ipsum"
        labelMode="vertical"
        onChange={toggleState}
        value={state.checked}
        info="Info text here"
        error="Error text here"
    />
</div>;
```

### Component tree

---

-   root - root element
-   infor - Info text wrapper
-   error - Error wrapper
-   formControl - Input wrapper excluding label
-   [Label](#/Forms?id=label)
-   inputWrapper - Wrapper around Label and switch components
-   [Switch](https://github.com/markusenglund/react-switch)
