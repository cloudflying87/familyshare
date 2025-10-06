# How to Request React Components from Claude

## Prompt Template

Copy this when asking Claude for React components:

```
Create a React component about [YOUR TOPIC] with these requirements:

IMPORTANT - Technical Requirements:
1. NO import statements - use: const { useState } = React;
2. NO external libraries (no Recharts, Chart.js, etc.) - build charts with SVG/HTML/CSS
3. NO Tailwind or className - inline styles only: style={{ }}
4. At the END include: ReactDOM.render(<ComponentName />, document.getElementById('react-root'));
5. Code runs in browser with React 18 from CDN

The component should: [YOUR FEATURES]
```

## Example

```
Create a React component about a todo list with these requirements:

IMPORTANT - Technical Requirements:
1. NO import statements - use: const { useState } = React;
2. NO external libraries - build charts with SVG/HTML/CSS
3. NO Tailwind or className - inline styles only: style={{ }}
4. At the END include: ReactDOM.render(<TodoList />, document.getElementById('react-root'));
5. Code runs in browser with React 18 from CDN

The component should:
- Add/delete todos
- Mark complete
- Filter all/active/completed
- Clean design with inline styles
```

## Why These Requirements?

- **No imports**: Babel Standalone can't resolve modules. React is loaded globally via CDN.
- **No external libs**: Only React is loaded, nothing else.
- **Inline styles**: No CSS framework available.
- **ReactDOM.render()**: Required to mount the component.

## Usage

1. Get code from Claude
2. Go to `/admin/` → Contents → Add Content
3. Content type: **React Page**
4. Paste code → Save
5. View on dashboard
