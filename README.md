# Ficticious UI

Ficticious UI is a component library designed to help developers create the best
experience for their users. Visit the
[Ficticious UI style guide](https://ficticious-ui.vercel.app/?path=/docs/ficticious-design-system-configure-your-project--docs)
to learn more.

## Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install ficticious-ui
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add ficticious-ui
```

If you prefer [pnpm](https://pnpm.io/), use the following command instead:

```bash
pnpm add ficticious-ui
```

### Usage

1. Import the CSS directly into your project if your asset packager supports it:

```js
import 'ficticious-ui/styles.css'
```

Otherwise include the CSS in your HTML. We suggest copying the latest
[styles file](https://unpkg.com/ficticious-ui@0.0.3/dist/styles.css) into your
own project. This will need to be updated with future releases.

```html
<link rel="stylesheet" href="styles.css" />
```

2. Include the translations and any of the provided components in your project:

```js
import { SearchableMenu } from 'ficticious-ui'
```

3. Tell React to render the element in the DOM:

```js
ReactDOM.render(
  <div>
    <SearchableMenu
      items={[
        { value: 'max', label: 'Max Mendez' },
        { value: 'victor', label: 'Victor Díaz' },
        { value: 'jesus', label: 'Jesús Millán' },
      ]}
      label="Pick a user"
      onSelect={item => console.log('Selected:', item)}
    />
  </div>,
  document.querySelector('#app'),
)
```

## Development

We use Storybook to create a simple, hot-reloading playground for development on
these components. You can edit the components file you are working on, and run
`pnpm storybook` in order to start the development server.

## Testing

We use Vitest for testing. To run the tests, run `pnpm test`.

### Manual visual regression testing

To start a server for manually viewing the visual regression testing examples,
run `pnpm storybook`.
