# Password

The Password component is a specialized input field that securely handles password entry. It extends the standard Input component and includes a visibility toggle icon that allows users to temporarily reveal the password text.

## Features

-   Toggle between hidden and visible password text
-   Inherits all functionality from the Input component
-   Focuses on security while maintaining user convenience
-   Easily integrates with forms and validation systems

## Usage

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
const onChange = (field) => {
    return (value) => {
        setState({ ...state, [field]: value });
    };
};

<div>
    <Password label="Password" placeholder="Write here" onChange={onChange(1)} value={state[1]} />
</div>;
```

### Component tree

---

Same [Input](#/Forms?id=Input) props and component tree
