# Drawer

The Drawer component provides a sliding panel that appears from the edge of the screen. It's commonly used for navigation menus, detail views, or forms that shouldn't take the user away from the current page.

## Features

-   Slides in from either the left or right side
-   Configurable width
-   Optional overlay that can be clicked to close
-   Support for ESC key to close
-   Transition events for animations
-   Can be shown or hidden programmatically

## Usage

Default:

```jsx
import { Button } from 'hoi-poi-ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const [side, setSide] = useState('right');

const onTransitionEnds = () => {
    console.log('Transition is finished');
};

<div>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('left');
        }}
    >
        Left
    </Button>
    <span> </span>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('right');
        }}
    >
        Right
    </Button>
    <span> </span>
    <Drawer
        onTransitionEnds={onTransitionEnds}
        side={side}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
    >
        <span onClick={() => setIsOpen(false)}>Close</span>
    </Drawer>
</div>;
```

Overlay close and "Esc" close:

```jsx
import { Button } from 'hoi-poi-ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const [side, setSide] = useState('right');

const onTransitionEnds = () => {
    console.log('Transition is finished');
};

<div>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('left');
        }}
    >
        Left
    </Button>
    <span> </span>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('right');
        }}
    >
        Right
    </Button>
    <span> </span>
    <Drawer
        onTransitionEnds={onTransitionEnds}
        side={side}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
    >
        <span onClick={() => setIsOpen(false)}>Close</span>
    </Drawer>
</div>;
```

Hidden Overlay:

```jsx
import { Button } from 'hoi-poi-ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const [side, setSide] = useState('right');

const onTransitionEnds = () => {
    console.log('Transition is finished');
};

<div>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('left');
        }}
    >
        Left
    </Button>
    <span> </span>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('right');
        }}
    >
        Right
    </Button>
    <span> </span>
    <Drawer
        onTransitionEnds={onTransitionEnds}
        side={side}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        hideOverlay={true}
    >
        <span onClick={() => setIsOpen(false)}>Close</span>
    </Drawer>
</div>;
```

Custom width:

```jsx
import { Button } from 'hoi-poi-ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const [side, setSide] = useState('right');

<div>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('left');
        }}
    >
        Left
    </Button>
    <span> </span>
    <Button
        color="primary"
        onClick={() => {
            setIsOpen(!isOpen);
            setSide('right');
        }}
    >
        Right
    </Button>
    <span> </span>
    <Drawer side={side} isOpen={isOpen} width="80%" onRequestClose={() => setIsOpen(false)}>
        <span onClick={() => setIsOpen(false)}>Close</span>
    </Drawer>
</div>;
```

### Component tree

---

-   root - root element
-   [modal](https://github.com/reactjs/react-modal)
-   content - inner content and `children` wrapper.
-   [Text](#/typography/Text)
