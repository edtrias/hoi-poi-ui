# FieldGroup

The FieldGroup component allows grouping multiple form components under a single label with a consistent layout. It provides a flexible way to arrange related fields, handle their values collectively, and apply common properties across them.

## Features

-   Group multiple form components in horizontal or vertical arrangements
-   Apply common properties to all fields or customize each field individually
-   Supports custom dividers between fields
-   Maintains consistent label positioning and error handling
-   Automatic value collection and change propagation
-   Compatible with all form components (Input, Select, DatePicker, etc.)
-   Full width support for responsive layouts

## Usage

```jsx
import { FieldGroup } from 'hoi-poi-ui';
```

Text Field:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup label="Label" inputs={[Input, Input]} onChange={setValues} value={values} />
</div>;
```

Horizontal:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Horizontal Label"
        labelMode="horizontal"
        inputs={[Input, Input]}
        onChange={setValues}
        value={values}
        isFullWidth
    />
</div>;
```

Horizontal with fieldsMode vertical:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Horizontal Label"
        labelMode="horizontal"
        inputs={[Input, Input]}
        onChange={setValues}
        value={values}
        isFullWidth
        fieldsMode="vertical"
    />
</div>;
```

Full width:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Input]}
        onChange={setValues}
        value={values}
        isFullWidth
    />
</div>;
```

With dividers:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Input]}
        onChange={setValues}
        value={values}
        dividerText="-"
    />
</div>;
```

Custom divider:

```jsx
import { useState } from 'react';
import Input from '../Input';
import Icon from '../../general/Icon';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Input]}
        onChange={setValues}
        value={values}
        divider={<Icon name="arrowRight" />}
    />
</div>;
```

Multiple fields:

```jsx
import { useState } from 'react';
import Input from '../Input';
import Icon from '../../general/Icon';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Input, Input, Input, Input, Input]}
        onChange={setValues}
        value={values}
        isFullWidth
    />
    <FieldGroup
        label="Label"
        inputs={[Input, Input, Input, Input, Input, Input]}
        onChange={setValues}
        value={values}
        isFullWidth
        divider={<Icon name="arrowRight" />}
    />
</div>;
```

Customizing props:

```jsx
import { useState } from 'react';
import Input from '../Input';

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Input, Input, Input, Input, Input]}
        inputProps={{ placeholder: 'Write here' }}
        onChange={setValues}
        value={values}
        isFullWidth
    />
    <FieldGroup
        label="Label"
        inputs={[Input, Input, Input, Input, Input, Input]}
        inputProps={[
            { placeholder: 'Field 1' },
            { placeholder: 'Field 2' },
            { placeholder: 'Field 3' },
            { placeholder: 'Field 4' },
            { placeholder: 'Field 5' },
            { placeholder: 'Field 6' },
        ]}
        onChange={setValues}
        value={values}
        isFullWidth
    />
</div>;
```

With diferent inputs:

```jsx
import { useState } from 'react';
import Input from '../Input';
import Select from '../../forms/Select';
import DatePicker from '../../forms/DatePicker';

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

const [values, setValues] = useState([]);

<div>
    <FieldGroup
        label="Label"
        inputs={[Input, Select, DatePicker]}
        inputProps={[
            { placeholder: 'Text' },
            { placeholder: 'Select', options },
            { placeholder: 'Date' },
        ]}
        onChange={setValues}
        value={values}
        isFullWidth
    />
</div>;
```

### Component tree

---

-   root - root element
-   rangeWrapper - Container for all input components
-   divider - Divider element between inputs
-   dividerText - Text used as divider
-   [Label](#/Forms?id=label) - Common label for all inputs
-   [InputWrapper](#/Forms?id=inputwrapper) - Wrapper for the entire component

```

```
