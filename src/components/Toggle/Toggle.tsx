import * as React from 'react';
import { animationHelpers } from '../Helpers/animationHelpers'

interface Props {
    
    time: number;
    delay: number;
    toggle?: boolean;
    clickHandler?: any;
    callBack?: any;
    className?: string;
    animClass?: string;

}

interface State {

}

export class Toggle extends React.Component<Props, State> { 

    private animRef: React.RefObject<HTMLInputElement>;
    private isAnimated: boolean = false;

	constructor(props: Props) {
        super(props);
        this.animRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.toggle !== this.props.toggle) {
            !this.isAnimated && this.switchClass();
        }

    }

    componentDidMount() {

        const { animClass, toggle } = this.props;
        const ref: HTMLElement = this.animRef.current;

        if (toggle) {
            animationHelpers.addClasses([animClass], ref);
        }

    }
    
    async switchClass() { 

        this.isAnimated = true; 

        const { time, delay, toggle, animClass, callBack } = this.props;
        const { setTransitionTiming, addClasses, removeClasses, timer } = animationHelpers;
        const ref: HTMLElement = this.animRef.current;

        if (toggle) { 
            // if toggle is true animate by adding the classes, and setting transition timing and delay 
            setTransitionTiming({time, delay}, ref);
            addClasses([animClass], ref);

        } else {
            // if toggle is false animate by removing the classes if they exist, and setting transition timing and delay 
            setTransitionTiming({time, delay}, ref);
            removeClasses([animClass], ref);
        }
        await timer(time + delay);
        setTransitionTiming({time: 0, delay: 0}, ref);
        callBack && callBack();
        this.isAnimated = false;

    }

    render() {

        const { children, className, clickHandler } = this.props;

        return(

            <div onClick={ clickHandler } ref={this.animRef} className={ className }>
            
                { children }

            </div>

        );


    }

}