import * as React from 'react';

export type LoadState = 'loading' | 'complete' | 'error';
export type Ref = (imageElement: HTMLImageElement | null) => void;

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

    private ref: Ref = imageElement => {
        if (imageElement) {
            imageElement.onload = this.onLoad;
            imageElement.onerror = this.onError;

            if (imageElement.complete) {
                this.setState({
                    loadState: imageElement.naturalWidth ? 'complete' : 'error',
                });
            }
        }

        this.setState({ imgEl: imageElement });
    }

    private onLoad = () => {
        this.setState({ loadState: 'complete' });
    }

    private onError = () => {
        this.setState({ loadState: 'error' });
    }
}

export default ImageLoading;
