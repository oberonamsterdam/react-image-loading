import * as React from 'react';

export interface LoadingPlaceholderProps {
    style?: React.CSSProperties;
    animationStyle?: React.CSSProperties;
    animationDuration?: number;
    animate?: boolean;
}

const defaultProps = {
    animationDuration: 1500,
    animate: true,
};

type DefaultProps = typeof defaultProps;
type InnerProps = LoadingPlaceholderProps & DefaultProps;

class LoadingPlaceholder extends React.Component<LoadingPlaceholderProps> {
    public static defaultProps = defaultProps;
    private animateEl: HTMLElement | null = null;
    private animationStart: number = NaN;

    public render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                    background: '#f3f3f3',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    ...this.props.style,
                }}
            >

                <div
                    ref={this.ref}
                    style={{
                        position: 'absolute',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                        background: 'linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,0.7) 50%,rgba(255,255,255,0) 100%)',
                        backgroundSize: '50% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        ...this.props.animationStyle,
                    }}
                />
            </div>
        );
    }

    private ref = (el: HTMLElement | null) => {
        this.animateEl = el;
        if (this.animateEl && this.props.animate && typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(this.animationLoop);
        }
    }

    private animationLoop = (timestamp: number) => {
        if (!this.animateEl || !this.props.animate) {
            return;
        }

        if (!this.animationStart) {
            this.animationStart = timestamp;
        }

        const props = this.props as InnerProps;
        const progress = ((timestamp - this.animationStart) % props.animationDuration) / props.animationDuration; // 0 - 1
        const x = (progress - 0.5) * 200; // -100 - 100
        this.animateEl.style.transform = `translateX(${x}%) rotateZ(10deg) scaleY(1.5)`;

        requestAnimationFrame(this.animationLoop);
    }
}

export default LoadingPlaceholder;
