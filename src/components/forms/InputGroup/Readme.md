# InputGroup

InputGroup is a component that allows grouping multiple input elements together with a shared label, hint, and error state. It supports progressive disclosure through a "show more" feature and different layout modes.

## Features

-   Groups multiple inputs under a single label and validation state
-   Supports progressive disclosure with "show more" functionality
-   Vertical or horizontal label positioning
-   Ability to show/hide specific inputs based on conditions
-   Customizable styling through overrides
-   Full width support for responsive layouts

## Usage

```jsx
import { InputGroup } from 'hoi-poi-ui';
```

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
