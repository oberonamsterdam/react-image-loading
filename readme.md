# React Image Loading

Load an image in React with loading placeholder and fallback, with maximum customizability.

## Installation

`npm i react-image-loading`

## Quick usage

This will render the out of the box implementation of the ImageLoading component, including a
loading placeholder and fallback that have absolute positioning to fill the dimensions
of the parent container. See below on how to implement custom rendering and behavior.

```js
import { Img } from 'react-image-loading';

const MyComponent = props =>
    <div style={{minHeight: 150, position: 'relative'}}>
        <Img src={props.src} srcSet={props.srcSet} />
    </div>
```

## Custom implementation

The out of the box Img provides a basic use case for loading images with a loading placeholder
and fallback. To customize you can implement your own version of the Img component specific to
your project needs. Below is an example that mimics the basic behavior of the provided Img component, 
but changes the color of the Fallback and LoadingPlaceholder:

```js
import * as React from 'react';
import ImageLoading, { Fallback, LoadingPlaceholder } from 'react-image-loading';

const Img = (props) => (
    <ImageLoading>
        {(ref, status) => (
            <React.Fragment>
                {status === 'error' || !props.src
                    ? <Fallback style={{ backgroundColor: 'red'}} />
                    : <React.Fragment>
                        <img ref={ref} {...props} />
                        <LoadingPlaceholder
                            style={{ 
                                transition: 'opacity 0.5s', 
                                opacity: status === 'loading' ? 1 : 0, 
                                backgroundColor: 'blue' 
                            }}
                            animate={status === 'loading'}
                        />
                    </React.Fragment>
                }
            </React.Fragment>
        )}
    </ImageLoading>
);

export default Img;
```

You can also choose to create your own implementations of the Fallback and LoadingPlaceholder, or
implement an entirely different logic altogether. 
Note: rendering the image tag with the provided ref is what triggers the loading of the image. 

## API

### `<ImageLoading>`

**Props**

- `children` **[RenderPropsFn](#renderpropsfn)**

### `RenderPropsFn`

Type: **Function**

**Params**

- `ref` **[Ref](#ref)**
- `status` **[LoadState](#loadstate)**

**Returns**

**React.ReactNode**

### `Ref`

Type: Function

**Params**

- `imageElement` **HTMLImageElement | null**

**Returns**

**void**

### `LoadState`

The loading state of the image. Will always start at "loading", even before first render of the image, so it will
immediately be put into loading state. 

Type: `'loading' | 'complete' | 'error'`

### `<LoadingPlaceholder>`

**Props**

- `style` **React.CSSProperties?**
- `animationStyle` **React.CSSProperties?**
- `animationDuration` **number?** Loop duration in ms
- `animate` **boolean?**

### `<Fallback>`

**Props**

- `style` **React.CSSProperties?**

