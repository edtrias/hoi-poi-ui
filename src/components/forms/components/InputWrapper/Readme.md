# InputWrapper

The InputWrapper component is a utility component used internally by various form elements to maintain consistent layout, styling, and behavior across the UI library. It provides standard handling for labels, error messages, info messages, and hints.

## Features

-   Consistent layout for form fields with labels, errors, and info messages
-   Support for two label modes: vertical (stacked) and horizontal (side-by-side)
-   Full width option for responsive layouts
-   Standardized error and info message display
-   Required field indicator with asterisk
-   Tooltip hint support
-   Accessible markup structure

## Usage

This component is primarily used internally by other form components, but can be used directly for custom form controls.

```jsx
import { InputWrapper } from 'hoi-poi-ui';

// Basic usage with a custom form control
<InputWrapper
  label="Username"
  error={errors.username}
  info="Your username will be visible to others"
  isRequired
>
  <YourCustomInputComponent />
</InputWrapper>

// Horizontal label mode
<InputWrapper
  label="Email"
  labelMode="horizontal"
  hint="We'll never share your email"
>
  <YourCustomInputComponent />
</InputWrapper>

// Full width for responsive layouts
<InputWrapper
  label="Description"
  isFullWidth
>
  <YourCustomTextareaComponent />
</InputWrapper>
```

## Component tree

---

-   root - root element
-   inputWrapper - Container for label and input
-   Label - Label component
-   formControl - Container for the input element(s)
-   fieldBottom - Container for error and info messages
