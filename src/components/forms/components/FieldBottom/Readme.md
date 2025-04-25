# FieldBottom

The FieldBottom component is a utility component used internally by form elements to render error and information messages below input fields in a consistent way. It provides standardized styling and positioning for these messages.

## Features

-   Consistent styling for error messages
-   Consistent styling for info messages
-   Support for full width layout
-   Conditional rendering (renders nothing if no messages)

## Usage

This component is primarily used internally by other form components, but can be used directly for custom form layouts.

```jsx
import { FieldBottom } from 'hoi-poi-ui';

// Display an error message
<FieldBottom error="This field is required" />

// Display an info message
<FieldBottom info="Your information is secure" />

// Display both error and info
<FieldBottom
  error="Please enter a valid email"
  info="We'll send a verification code to this address"
/>

// Full width for responsive layouts
<FieldBottom
  error="This field is required"
  isFullWidth
/>
```

## Component tree

---

-   root - root element
-   error - Error message container
-   info - Info message container
