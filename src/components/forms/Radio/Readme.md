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
