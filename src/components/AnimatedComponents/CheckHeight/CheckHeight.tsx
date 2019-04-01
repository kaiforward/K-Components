import * as React from 'react';
import { animationHelpers } from '../../Helpers/animationHelpers'
import { resolve } from 'q';

interface Props {
    time?: number;
    open?: boolean;
    callback?: any;
    animateOnStart?: boolean;
}

interface State {

}

class CheckHeight extends React.Component<Props, State> {

    private ref = null;
    private isAnimated = false;
    static defaultProps = {
        open: true,
        animateOnStart: false
    }

    constructor(props: Props) {
        super(props);

        this.ref = React.createRef();
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

        const { transitionNaturalHeight, setTransitionTiming, setStyle } = animationHelpers;
        const ref: HTMLElement = this.ref.current;
        const { open, time, animateOnStart } = this.props;

        animateOnStart ? transitionNaturalHeight(ref, time, open) : setStyle({height: open ? "" : "0px" }, ref);

    }

    componentDidUpdate(prevProps: Props, prevState: State) {

        if (prevProps.open !== this.props.open) {

            this.toggle();

        }

    }

    async toggle() {

        const { transitionNaturalHeight, timer } = animationHelpers;
        const ref: HTMLElement = this.ref.current;
        const { open, callback, time } = this.props;

        if (!this.isAnimated && this.ref.current) {

            this.isAnimated = true;

            await transitionNaturalHeight(ref, time, open);
            
            callback && callback();  

            this.isAnimated = false;

        }
        await timer(0);

    }

    render() {

        const { children } = this.props;

        return(

            <div ref={this.ref} className={"c-height-check"}>
                { children }
            </div>                

        );

    }
}

export { CheckHeight };