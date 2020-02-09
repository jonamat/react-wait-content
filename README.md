# react-wait-content

![version](https://img.shields.io/npm/v/react-wait-content)
![size](https://img.shields.io/bundlephobia/min/react-wait-content)
![download](https://img.shields.io/npm/dm/react-wait-content)

React component to postpone children rendering to a determined load state of the page (DOM loaded or fully loaded) with optional additional delay.\
It can show a fallback component while waiting and fire a callback at children rendering.

## Installation

```cli
npm i react-wait-content
```

## Compatibility

Compatible with React >=16.8.0\
Compatible with Node >=8.0.0

## Features
- Useful for SEO purposes (it delays images or entire off-screen components and sections) and to reduce the First Contentful Paint
- Extremely small: uses react hooks and will occupying less than 2kb in your final bundle
- Safe unmounting: clears timers and listeners at unmounting

### Other features
- Runtime type checking with prop-types and static with typescript declaration files
- Exhaustive doc comments
- Tree shakable: exported with ESM modules
- Tested with available coverage report

## API

Index

[Defer](#Defer)\
[TriggerEvent](#TriggerEvent)

---

#### Defer

```import { Defer } from 'react-wait-content'```

Type: `FunctionComponent`

| Prop        | Type                          | Default     | Description                                            |
| ----------- | ----------------------------- | ----------- | ------------------------------------------------------ |
| `trigger`?  | [TriggerEvent](#TriggerEvent) | `bypass`    | State of the page that triggers the children rendering |
| `fallback`? | `ReactNode`                   | `undefined` | Component to render instead of children while waiting  |
| `timeout`?  | `number`                      | `0`         | Additional delay                                       |
| `onRender`? | `Function`                    | `undefined` | Function to call on rendering                          |

#### TriggerEvent

```import { TriggerEvent } from 'react-wait-content'```

Type: `'bypass'`, `'domLoaded'`, `'pageLoaded'`

| Value          | Description                                             |
| -------------- | ------------------------------------------------------- |
| `'bypass'`     | Renders children immediately                            |
| `'domLoaded'`  | Renders children when "DOMContentLoaded" event is fired |
| `'pageLoaded'` | Renders children when "load" event is fired             |

---

## Usage examples

```jsx
import { Defer } from 'react-wait-content'

const App = () => {

    const handleOnRender = () => window.alert('onRender called')

    return (
        <div>

            <h1>This will appear first</h1>

            <Defer
            trigger='pageLoaded'
            fallback={<CircularProgress />} // <-- this will be rendered while page is loading
            timeout={1000}
            onRender={handleOnRender}>

                <h1>This will appear at page loaded + 1 second</h1>

            </Defer>
        </div>;
    )
}

```

  ## Dependencies

[react-delay-fallback](https://github.com/jonamat/react-delay-fallback) 1.0.1

### Peer dependencies
- React: ^16.8.0
- ReactDOM: ^15.6.2

## License
MIT
