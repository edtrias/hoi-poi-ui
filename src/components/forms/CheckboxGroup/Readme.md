# CheckboxGroup

The CheckboxGroup component provides a group of checkboxes with consistent styling and behavior. It allows users to select multiple options from a predefined list, supports individual hints for each option, and handles both group-level and individual error states.

## Features

-   Multiple checkbox options in a grouped interface
-   Support for read-only state (for all or individual checkboxes)
-   Tooltip hints for individual options
-   Error handling at both group and individual checkbox level
-   Support for both horizontal and vertical label modes
-   Full-width layout option for responsive designs
-   Custom color theme support

## Usage

```jsx
import { CheckboxGroup } from 'hoi-poi-ui';
```

Default

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    labelMode="horizontal"
    options={options}
    onChange={onChange}
    value={state}
/>;
```

Vertical

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    labelMode="vertical"
    options={options}
    onChange={onChange}
    value={state}
/>;
```

With error

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    options={options}
    onChange={onChange}
    value={state}
    error="Required field"
/>;
```

With individual errors

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    options={options}
    onChange={onChange}
    value={state}
    error={{
        lorem: 'This option is required',
    }}
/>;
```

With hints

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
        hint: {
            title: 'Lorem ipsum',
            body: 'Lorem ipsum dolor sit amet',
        },
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup label="Lorem ipsum" options={options} onChange={onChange} value={state} />;
```

Disabled

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({
    lorem: true,
    lorem2: false,
    lorem3: true,
});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    options={options}
    onChange={onChange}
    value={state}
    isReadOnly={true}
/>;
```

Full width

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        value: 'lorem',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem3',
    },
];

const [state, setState] = useState({});
let onChange = (value) => setState(value);
<CheckboxGroup
    label="Lorem ipsum"
    options={options}
    onChange={onChange}
    value={state}
    isFullWidth={true}
/>;
```

### Component tree

---

-   root - root element
-   error - Error wrapper
-   [Checkbox](#/Forms?id=checkbox)
-   checkboxLabel - label related to one checkbox
-   checkboxControl - wrapper with checkbox label and checkbox
-   formControl - Input wrapper excluding label
-   error - Error wrapper
-   [Label](#/Forms?id=label)
