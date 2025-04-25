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

<div>
    <Label>Username</Label>

    <Label isRequired>Email Address</Label>

    <Label hint="We'll never share your email">Email Address</Label>

    <Label isDisabled>Password</Label>

    <Label isRequired hint="Must be at least 8 characters">
        Password
    </Label>
</div>;
```

### Component tree

---

-   root - root element
-   [Popover](#/Utils?id=popover)
-   text - text part, without info popover
-   [Text](#/Typography?id=text)
