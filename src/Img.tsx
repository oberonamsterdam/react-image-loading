import * as React from 'react';
import { ImgHTMLAttributes } from 'react';
import ImageLoading from './ImageLoading';
import LoadingPlaceholder from './LoadingPlaceholder';
import Fallback from './Fallback';

const ImageLoad = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <ImageLoading>
        {(ref, status) => (
            <React.Fragment>
                {status === 'error' || !props.src
                    ? <Fallback/>
                    : <React.Fragment>
                        <img ref={ref} {...props} />
                        <LoadingPlaceholder
                            style={{ transition: 'opacity 0.5s', opacity: status === 'loading' ? 1 : 0 }}
                            animate={status === 'loading'}
                        />
                    </React.Fragment>
                }
            </React.Fragment>
        )}
    </ImageLoading>
);

export default ImageLoad;
