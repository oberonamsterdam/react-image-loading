# React Image Loading

Load an image in React with loading placeholder and fallback, with maximum customizability.

## Installation

`npm i react-image-loading`

## Quick usage

```js
import { Img } from 'react-image-loading';

const MyComponent = props =>
    <div style={{minHeight: 150, position: 'relative'}}>
        <Img src={props.src} srcSet={props.srcSet} />
    </div>
```