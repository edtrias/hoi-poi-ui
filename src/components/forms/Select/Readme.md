Select:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
const onChange = (field) => {
    return (e) => {
        setState({ ...state, [field]: e && e.target ? e.target.value : '' });
    };
};

<div>
    <Select label="Select" placeholder="Write here" onChange={onChange(1)} value={state[1]}/>
</div>
```