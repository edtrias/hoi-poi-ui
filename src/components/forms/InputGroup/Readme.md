# InputGroup

InputGroup is a form component that manages a collection of inputs where only the first input is visible by default, and additional inputs can be shown or hidden with a toggle link. This is useful for forms that need to collect primary information upfront while keeping secondary fields easily accessible but not initially visible.

## Features

-   Shows the first input by default, with additional inputs hidden
-   Provides a toggle link to show/hide additional inputs
-   Maintains consistent state across all inputs in the group
-   Supports horizontal and vertical label modes
-   Handles all standard input events (onChange, onBlur, onFocus, onEnter)
-   Fully customizable through overrides
-   Support for readonly state

## Usage

Default

```jsx
import { useState } from 'react';

let inputs = [
    {
        label: 'Lorem ipsum',
        name: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        name: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        name: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState({ value });
<InputGroup
    label="Lorem ipsum"
    placeholder="Type here"
    inputs={inputs}
    onChange={onChange}
    value={state.value}
    isRequired
/>;
```

Disabled

```jsx
import { useState } from 'react';

let inputs = [
    {
        label: 'Lorem ipsum',
        name: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        name: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        name: 'lorem3',
    },
];
const [state, setState] = useState({});
let onChange = (value) => setState({ value });
<InputGroup
    label="Lorem ipsum"
    inputs={inputs}
    onChange={onChange}
    value={state.value}
    isReadOnly
/>;
```

Focused

```jsx
import { useState } from 'react';

let inputs = [
    {
        label: 'Lorem ipsum',
        name: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        name: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        name: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState({ value });
<InputGroup
    label="Lorem ipsum"
    placeholder="Type here"
    inputs={inputs}
    onChange={onChange}
    value={state.value}
    isRequired
    autoFocus
/>;
```

Default vertical label

```jsx
import { useState } from 'react';

let inputs = [
    {
        label: 'Lorem ipsum',
        name: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        name: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        name: 'lorem3',
    },
];
const [state, setState] = useState({});
let onChange = (value) => setState({ value });
<InputGroup
    label="Lorem ipsum"
    labelMode="vertical"
    inputs={inputs}
    onChange={onChange}
    value={state.value}
/>;
```

Full width

```jsx
import { useState } from 'react';

let inputs = [
    {
        label: 'Lorem ipsum',
        name: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        name: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        name: 'lorem3',
    },
];
const [state, setState] = useState({});
let onChange = (value) => setState({ value });
<InputGroup
    label="Lorem ipsum"
    labelMode="vertical"
    inputs={inputs}
    onChange={onChange}
    value={state.value}
    isFullWidth={true}
/>;
```

### Component tree

---

-   root - root element
-   [Input](#/Forms?id=input): Affect all inputs
-   [Link](/#/General?id=link)
-   formControl - wrapper with principal input and toggle inputs button
-   inputsControl - wrapper with inputs
-   [Label](#/Forms?id=label)
