# Code

The Code component provides a powerful code editor based on Ace Editor. It offers features like syntax highlighting, autocompletion, line numbers, and code folding, while maintaining the same styling and behavior conventions as other form components.

## Features

-   JavaScript syntax highlighting with the Monokai theme
-   Code autocompletion and snippets
-   Line numbers and gutters
-   Text wrapping
-   Read-only mode support
-   Compatible with form layout system (labels, error states)
-   Adjustable height through minLines and maxLines

## Usage

Default:

```jsx
import { useState } from 'react';

const [state, setState] = useState('');

<Code isFullWidth label="Code" onChange={setState} value={state} />;
```

### Component tree

---

-   root - root element
-   input - Native input
-   info - Info text wrapper
-   error - Error wrapper
-   formControl - Input wrapper excluding label
-   [Label](#/Forms?id=label)
-   inputWrapper - Wrapper around Label and input components
-   [react-ace](https://github.com/securingsincity/react-ace)
