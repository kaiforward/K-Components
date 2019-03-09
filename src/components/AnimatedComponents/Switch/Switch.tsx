import * as React from 'react';
import { Toggle } from '../../Toggle/Toggle';
import { themes } from '../Switch/style';

interface Props {

    classNames?: Classes;
    clickHandler?: any;
    isDisabled?: boolean;
    openOnStart?: boolean;
    animateOnStart?: boolean;

}

interface State {
    isAnimated: boolean;
    openSwitch: boolean;
}

export class Switch extends React.Component<Props, State> {

    static defaultProps = {
        openOnStart: false,
        classNames: themes.themeOne
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            openSwitch: this.props.openOnStart,
            isAnimated: false
        }
        this.animationFinished = this.animationFinished.bind(this);
        this.toggle = this.toggle.bind(this);
        this.clickHandlers = this.clickHandlers.bind(this);
    }

    componentDidMount() {

        const { animateOnStart } = this.props;

        if (animateOnStart) {
            this.setState({
                openSwitch: true
            });            
        }

    }

    toggle() {

        this.setState({
            openSwitch: !this.state.openSwitch,
            isAnimated: true
        });

    }

    animationFinished() {

        this.setState({
            isAnimated: false
        });

    }

    clickHandlers() {
        const { isAnimated } = this.state;
        const { clickHandler, isDisabled  } = this.props;
        if (!isAnimated && !isDisabled) {
            clickHandler && clickHandler();
            this.toggle();                
        }
    }

    render() {

        const { openSwitch } = this.state;
        const { classNames } = this.props;
        const { switchMain, switchBody, switchBodyToggleOn, switchLabel, switchLabelOn, switchLabelOff, switchLabelHidden, switchToggle, switchToggleOn } = classNames;
        return (
            <div onClick={ this.clickHandlers } className={switchMain}>
                <Toggle toggle={openSwitch} time={250} delay={0} className={switchBody} animClass={switchBodyToggleOn}>
                    <Toggle toggle={!openSwitch} time={250} delay={0} className={switchLabel + ' ' +  switchLabelOn} animClass={switchLabelHidden}>on</Toggle>
                    <Toggle toggle={openSwitch} time={250} delay={0} className={switchLabel + ' ' +  switchLabelOff} animClass={switchLabelHidden}>off</Toggle>
                    <Toggle toggle={openSwitch} time={250} delay={0} className={switchToggle} animClass={switchToggleOn} callBack={this.animationFinished}/>
                </Toggle>                
            </div>     
        );

    }

}