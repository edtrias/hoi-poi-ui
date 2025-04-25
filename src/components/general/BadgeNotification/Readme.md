# BadgeNotification

The BadgeNotification component displays numerical notifications or short text in a small, attention-grabbing circular element. It's typically used to indicate counts, such as unread messages, pending tasks, or other quantitative notifications.

## Features

-   Three size options (tiny, small, medium)
-   Circular design with centered text
-   High contrast color scheme for visibility
-   Responsive font sizing appropriate to each size variant

## Usage

Default:

```jsx
<BadgeNotification>1</BadgeNotification>
<span> </span>
<BadgeNotification>12345</BadgeNotification>
```

Small

```jsx
<BadgeNotification size="small">1</BadgeNotification>
<span> </span>
<BadgeNotification size="small">12345</BadgeNotification>
```

Tiny

```jsx
<BadgeNotification size="tiny">1</BadgeNotification>
<span> </span>
<BadgeNotification size="tiny">12345</BadgeNotification>
```

### Component tree

---

-   root - root element
-   [Text](#/Typography?id=text)
