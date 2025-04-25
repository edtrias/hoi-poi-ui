# Label

The Label component provides a standardized way to display labels for form fields across the UI library. It supports required field indication with an asterisk and informational hints with tooltips.

## Features

-   Consistent styling for field labels
-   Required field indication with asterisk
-   Tooltip hints via an info icon
-   Disabled state styling
-   Integration with the typography system

## Usage

```jsx
import { Label } from 'hoi-poi-ui';

// Basic label
<Label>Username</Label>

// Required field label
<Label isRequired>Email Address</Label>

// Label with informational hint
<Label hint="We'll never share your email">Email Address</Label>

// Disabled label
<Label isDisabled>Password</Label>

// Combination of features
<Label isRequired hint="Must be at least 8 characters">Password</Label>
```

### Component tree

---

-   root - root element
-   [Popover](#/Utils?id=popover)
-   text - text part, without info popover
-   [Text](#/Typography?id=text)
