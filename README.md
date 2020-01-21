# react-library-boilerplate

Starting point for my React components libraries.\
It provides a bunch of semi-defined files to speed up lib developing and publishing (included this readme).\
Build script transpiles typescript source to tree-shakable esnext code with ES modules and legacy ES5 code with commonJS modules, both generated with ts declaration file.\
It provides also support for component testing with Jest, React Testing Library and React Test Renderer, coverage reports, eslint linting and prettier/editorConfig integration

## Installation

```cli
npm i **package name**
```

## Compatibility

Compatible with React >=16.8.0\
Compatible with Node >=8.0.0

## Feature
- List of the features of the lib
- "Other features" are common features provided in all my libs

### Other features
- Runtime type checking with prop-types and static with typescript declaration files
- Exhaustive doc comments
- Tree shakable: exported with ESM modules
- Tested with available coverage report

## API

Index

[MyComponent](#MyComponent)

---

#### MyComponent

MyComponent description

```import { MyComponent } from 'react-library-boilerplate'```

| Prop     | Type      | Default | Description    |
| -------- | --------- | ------- | -------------- |
| `myProp` | ReactNode | `world` | Something cool |

---

## Usage examples

A list of examples

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { MyComponent } from 'react-library-boilerplate'

ReactDOM.render(
    <MyComponent myProp="moon" />,
     document.getElementById('root')
)

```

## Dependencies

No dependencies

### Peer dependencies
- React: ^16.8.0
- ReactDOM: ^15.6.2

## License
MIT
