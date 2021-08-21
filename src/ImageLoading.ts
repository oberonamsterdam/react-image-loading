import * as React from 'react';

export type LoadState = 'loading' | 'complete' | 'error';
export type Ref = (imageElement: HTMLImageElement | null) => void;

const OVERSIZED_THRESHOLD = 1.5;

interface ImageLoadingProps {
    children: (ref: Ref, status: LoadState) => React.ReactNode;
}

interface State {
    loadState: LoadState;
    imgEl: HTMLImageElement | null;
}

class ImageLoading extends React.Component<ImageLoadingProps, State> {
    public state: State = {
        loadState: 'loading',
        imgEl: null,
    };

    public render() {
        const { loadState } = this.state;
        return this.props.children(this.ref, loadState);
    }

    public componentWillUnmount() {
        if (this.state.loadState === 'loading') {
            this.cancelImageLoad();
        }
    }

    private cancelImageLoad() {
        if (this.state.imgEl) {
            this.state.imgEl.onload = null;
            this.state.imgEl.onerror = null;
            this.state.imgEl.src = '';
        }
    }

    private ref: Ref = imageElement => {
        if (imageElement) {
            // The timeout fixes an issue with cached images in firefox where the naturalWidth is set one frame later
            setTimeout(() => {
                if (imageElement.complete) {
                    if (imageElement.naturalWidth) {
                        this.onLoad(imageElement);
                    } else {
                        this.onError();
                    }
                } else {
                    imageElement.onload = () => this.onLoad(imageElement);
                    imageElement.onerror = this.onError;
                }
            });
        }

        this.setState({ imgEl: imageElement });
    }

    private onLoad = (image: HTMLImageElement) => {
        this.setState({ loadState: 'complete' });

        if (
            typeof process !== 'undefined' &&
            process.env &&
            process.env.NODE_ENV === 'development' &&
            image &&
            imageIsOversized(image)
        ) {
            const dpi = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
            const dpiStr = dpi > 1 ? ` (x${dpi})` : '';

            console.warn(`Loaded image ${image.currentSrc} is oversized. Reduce loaded image dimensions or use srcSet. ` +
                `Rendered dimensions: ${image.width}x${image.height} ${dpiStr}` +
                `loaded image dimensions: ${image.naturalWidth}x${image.naturalHeight} ${dpiStr}`);
        }
    }

    private onError = () => {
        this.setState({ loadState: 'error' });
    }
}
export const imageIsOversized = (image: HTMLImageElement) =>
    image.naturalWidth > image.width * OVERSIZED_THRESHOLD ||
    image.naturalHeight > image.height * OVERSIZED_THRESHOLD;

export default ImageLoading;
