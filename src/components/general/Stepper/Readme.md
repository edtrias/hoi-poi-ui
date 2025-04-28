# Stepper

The Stepper component provides a visual indicator of the user's progress through a sequence of steps. It displays a horizontal series of numbered circles connected by lines, with completed steps marked by checkmarks.

## Features

-   Shows progress through a multi-step process
-   Customizable step labels
-   Completed steps are visually indicated with checkmarks
-   Supports both horizontal and vertical label placement
-   Option to display without labels for a compact view
-   Interactive steps allowing navigation to previous steps

## Usage

Default:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
let steps = [
    {
        title: 'Step 1',
        isCompleted: true,
    },
    {
        title: 'Step 2',
    },
    {
        title: 'Step 3',
    },
    {
        title: 'Step 4',
    },
    {
        title: 'Step 5',
    },
];

const currentStep = state.currentStep !== undefined ? state.currentStep : 1;
function onClick(step) {
    setState({
        currentStep: step,
    });
}

<Stepper onClick={onClick} currentStep={currentStep} steps={steps} />;
```

With Vertical Labels:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
let steps = [
    {
        title: 'Step 1',
        isCompleted: true,
    },
    {
        title: 'Step 2',
    },
    {
        title: 'Step 3',
    },
    {
        title: 'Step 4',
    },
    {
        title: 'Step 5',
    },
];

const currentStep = state.currentStep !== undefined ? state.currentStep : 1;
function onClick(step) {
    setState({
        currentStep: step,
    });
}

<Stepper onClick={onClick} currentStep={currentStep} steps={steps} labelPlacement="vertical" />;
```

Without Labels:

```jsx
import { useState } from 'react';

const [state, setState] = useState({});
let steps = [
    {
        title: 'Step 1',
        isCompleted: true,
    },
    {
        title: 'Step 2',
    },
    {
        title: 'Step 3',
    },
    {
        title: 'Step 4',
    },
    {
        title: 'Step 5',
    },
];

const currentStep = state.currentStep !== undefined ? state.currentStep : 1;

function onClick(step) {
    setState({
        currentStep: step,
    });
}

<Stepper onClick={onClick} currentStep={currentStep} steps={steps} withoutLabels />;
```

### Component tree

---

-   root - main container element
-   icon - step indicator circle with number or checkmark
-   rc-steps - underlying library component for steps layout
