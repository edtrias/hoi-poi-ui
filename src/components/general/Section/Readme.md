# Section

The Section component provides a collapsible container for grouping related content. It features a header with a title and optional controls for expanding, collapsing, or removing the section.

## Features

-   Expandable/collapsible content area
-   Optional remove functionality
-   Support for tracking active fields and displaying counts
-   Custom title components
-   Controlled or uncontrolled expansion state
-   Optional header components (pre and post)
-   Consistent styling with the design system

## Usage

Section Simple

```jsx
import { Input } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section title="Title here">
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

Section With ActiveFields

```jsx
import { Input } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({ value: 'Lorem ipsum', activeFields: 1 });
const onChange = (value) => {
    setState({ value, activeFields: value ? 1 : 0 });
};

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section title="Title here" activeFields={state.activeFields} defaultOpen={false}>
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

Removable Section With ActiveFields

```jsx
import { Input } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({ value: 'Lorem ipsum', activeFields: 1 });
const onChange = (value) => {
    setState({ value, activeFields: value ? 1 : 0 });
};

const onRemove = () => console.log('Remove');

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section
        title="Title here"
        activeFields={state.activeFields}
        onRemove={onRemove}
        defaultOpen={false}
    >
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

Section Not Expandable

```jsx
import { Input } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({ value: 'Lorem ipsum', activeFields: 1 });
const onChange = (value) => {
    setState({ value, activeFields: value ? 1 : 0 });
};

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section
        title="Title here"
        activeFields={state.activeFields}
        defaultOpen={false}
        isExpandable={false}
    >
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

Custom title component

```jsx
import { Icon, Text, Input } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

const titleComponent = (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Icon name="thickEnabled" />
        <Text style={{ marginLeft: 10 }}>Title here</Text>
    </div>
);

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section title={titleComponent}>
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

Controlled

```jsx
import { useState } from 'react';
import { Button, Input } from 'hoi-poi-ui';

const [isOpen, setIsOpen] = useState({});
const [state, setState] = useState({});

const onOpen = (e) => setIsOpen(!isOpen);
const onChange = (value) => setState({ value });

<div style={{ padding: 16, backgroundColor: '#F4F5F6' }}>
    <Button color="primary" onClick={onOpen} style={{ marginBottom: 16 }}>
        Toggle Section
    </Button>
    <Section title="Title here" isOpen={isOpen} onChange={onOpen}>
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

With header pre/post component

```jsx
import { Input, Icon } from 'hoi-poi-ui';
import { useState } from 'react';

const [state, setState] = useState({});
const onChange = (value) => setState({ value });

<div style={{ padding: 20, backgroundColor: '#F4F5F6' }}>
    <Section
        title="Title here"
        headerPreComponent={
            <div>
                <Icon name="apps" />
            </div>
        }
        headerPostComponent={
            <div>
                <Icon name="apps" />
            </div>
        }
    >
        <Input
            label="Lorem ipsum"
            placeholder="Write here"
            onChange={onChange}
            value={state.value}
        />
    </Section>
</div>;
```

### Component tree

---

-   root - main container element
-   header - section header that contains the title and controls
-   textContainer - wrapper for the title text
-   titleContainer - container for the title and icon
-   headerContent - container for all header elements
-   icon - dropdown arrow icon for expandable sections
-   BadgeNotification - badge showing count of active fields when collapsed
-   AnimateHeight - animation wrapper for expandable content
