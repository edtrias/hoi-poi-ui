# Progress

The Progress component displays a horizontal progress bar that visually represents the completion of a task or process. It changes color based on the percentage of completion.

## Features

-   Color indicators for different progress levels (low, medium, high, higher, full)
-   Customizable maximum value
-   Smooth animation options when progress values change
-   Accessible with ARIA attributes

## Usage

```jsx
<div style={{ display: 'flex', flexFlow: 'column', gap: 8 }}>
    <Progress value={15} />
    <Progress value={35} />
    <Progress value={55} />
    <Progress value={75} />
    <Progress value={100} />
    <Progress value={150} />
</div>
```

Animated:

```jsx
import { useState, useEffect, useRef } from 'react';

const [value, setValue] = useState(50);
const interval = useRef();

const animation = {
    animationDuration: '2s',
    animationDelay: null,
    animationTimingFunction: 'cubic-bezier(.6, 0, .5, .9)',
};

useEffect(() => {
    interval.current = setInterval(() => {
        const newValue = Math.floor(Math.random() * 101);
        setValue(newValue);
    }, 4000);
    return () => {
        if (interval.current) clearInterval(interval.current);
    };
}, []);

<div style={{ display: 'flex', flexFlow: 'column', gap: 8 }}>
    <Progress value={value} animation={animation} />
</div>;
```

### Component tree

---

-   root - main container element
