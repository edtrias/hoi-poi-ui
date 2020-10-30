Default:

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum 1',
        value: 'lorem-ipsum-1',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem-ipsum-2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem-ipsum-3',
    },
    {
        label: 'Lorem ipsum 4',
        value: 'lorem-ipsum-4',
    },
];

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

<div>
    <SelectButton
        placeholder="Search..."
        onChange={onChange}
        options={options}
        value={state.value}
        isMulti
    >
        Select Button
    </SelectButton>
</div>;
```

Default:

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum 1',
        value: 'lorem-ipsum-1',
    },
    {
        label: 'Lorem ipsum 2',
        value: 'lorem-ipsum-2',
    },
    {
        label: 'Lorem ipsum 3',
        value: 'lorem-ipsum-3',
    },
    {
        label: 'Lorem ipsum 4',
        value: 'lorem-ipsum-4',
    },
];

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

<div>
    <SelectButton
        placeholder="Search..."
        onChange={onChange}
        options={options}
        value={state.value}
        isMulti
        isFullWidth
    >
        Select Button
    </SelectButton>
</div>;
```

Grouped options:

```jsx
import { useState } from 'react';

const options = [
    {
        label: 'Lorem ipsum',
        options: [
            {
                label: 'Lorem ipsum 1',
                value: 'lorem-ipsum-1',
            },
            {
                label: 'Lorem ipsum 2',
                value: 'lorem-ipsum-2',
            },
            {
                label: 'Lorem ipsum 3',
                value: 'lorem-ipsum-3',
            },
            {
                label: 'Lorem ipsum 4',
                value: 'lorem-ipsum-4',
            },
        ],
    },
    {
        label: 'Dolor amet',
        options: [
            {
                label: 'Dolor amet 1',
                value: 'dolor-amet-1',
            },
            {
                label: 'Dolor amet 2',
                value: 'dolor-amet-2',
            },
            {
                label: 'Dolor amet 3',
                value: 'dolor-amet-3',
            },
            {
                label: 'Dolor amet 4',
                value: 'dolor-amet-4',
            },
        ],
    },
];

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

<div>
    <SelectButton
        placeholder="Search..."
        onChange={onChange}
        options={options}
        value={state.value}
        actions={[
            {
                label: 'Create new lorem ipsum',
                onClick: () => console.log('click'),
            },
            {
                label: 'Create a new dolor ipsum',
                onClick: () => console.log('click'),
            },
        ]}
        isMulti
    >
        Select Button
    </SelectButton>
</div>;
```

### Component tree

---

-   root - root element
-   [Select](#/Forms?id=select)
-   [Button](#/General?id=button)
