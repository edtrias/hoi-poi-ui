# TitleDivider

The TitleDivider component provides a styled title with a horizontal divider line below it. It's useful for separating sections of content with a visually distinct heading.

## Features

-   Simple, consistent section dividers with titles
-   Various typography styles available for the title text
-   Consistent styling with the design system
-   Customizable via overrides

## Usage

Default:

```jsx
import { TitleDivider } from 'hoi-poi-ui';

<div>
    <TitleDivider>Lorem ipsum</TitleDivider>
</div>;
```

With different typography style:

```jsx
import { TitleDivider } from 'hoi-poi-ui';

<div>
    <TitleDivider type="h3">Section Title</TitleDivider>
    <p>Content below the section title...</p>
</div>;
```

### Component tree

---

-   root - container element with the bottom border
-   Text - text component for the title content
