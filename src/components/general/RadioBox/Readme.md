# RadioBox

The RadioBox component combines a radio button with rich content, including an icon, title, and descriptive text. It's ideal for displaying selectable options that require more visual information than a standard radio button.

## Features

-   Icon, title, and descriptive text in a single selectable component
-   Support for checked and read-only states
-   Ability to display additional content when selected
-   Consistent styling with the design system
-   Interactive selection with onChange callback

## Usage

States:

```jsx
<div>
    <RadioBox
        icon="accountsAdd"
        title={'Create new accounts'}
        text={'Import data to add new accounts to ForceManager'}
    />
    <br />
    <RadioBox
        icon="accountsEdit"
        title={'Update existing accounts'}
        text={'Import data to update ForceManager accounts'}
        checked
    />
    <br />
    <RadioBox
        icon="opportunityAdd"
        title={'Create new accounts'}
        text={'Import data to add new accounts to ForceManager'}
        isReadOnly
    />
    <br />
    <RadioBox
        icon="opportunityEdit"
        title={'Update existing accounts'}
        text={'Import data to update ForceManager accounts'}
        isReadOnly
        checked
    />
</div>
```

With children:

```jsx
import { Text } from 'hoi-poi-ui';

<RadioBox
    icon="accountsAdd"
    title={'Update existing accounts'}
    text={'Import data to update ForceManager accounts'}
    checked
>
    <Text style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>Children</Text>
</RadioBox>;
```

### Component tree

---

-   root - root element
-   icon - icon element
-   content - container for text content
-   title - title text element
-   text - descriptive text element
-   children - additional content displayed when checked
-   radio - radio input element
