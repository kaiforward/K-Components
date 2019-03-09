import * as React from 'react';
import { Toggle } from '../../Toggle/Toggle';
import { Switch } from '../Switch/Switch';

interface Props {
    openOnStart?: boolean;
    animateOnStart?: boolean;
}

interface State {
    isAnimated: boolean;
    openMenu: boolean;
    openMenuItem: boolean;
}

export class Menu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            openMenu: this.props.openOnStart,
            openMenuItem: this.props.openOnStart,
            isAnimated: false
        }
        this.menuTrigger = this.menuTrigger.bind(this);
        this.menuItemTrigger = this.menuItemTrigger.bind(this);
        this.animationFinished = this.animationFinished.bind(this);
    }

    componentDidMount() {

        const { animateOnStart } = this.props;

        if (animateOnStart) {
            this.setState({
                openMenu: true
            });            
        }

    }

    menuTrigger() {

        this.setState({
            openMenu: !this.state.openMenu,
            isAnimated: true
        });

    }

    menuItemTrigger() {

        this.setState({
            openMenuItem: !this.state.openMenuItem,
            isAnimated: true
        });

    }

    animationFinished() {

        this.setState({
            isAnimated: false
        });

    }

    render() {

        const { openMenu, openMenuItem, isAnimated } = this.state;
        const { openOnStart, animateOnStart } = this.props;
        const clickHandler: any = !openMenu ? this.menuTrigger : this.menuItemTrigger;

        return (
            <div>
                <div className="o-form-item">
                    <Switch openOnStart={openOnStart} animateOnStart={animateOnStart} clickHandler={ isAnimated ?  undefined : clickHandler } isDisabled={isAnimated}/> Linked animated components
                </div>
                <Toggle time={750} delay={0} className={"c-block"} animClass={"c-block--fade-in"} toggle={openMenu} callBack={ openMenu ? this.menuItemTrigger : this.animationFinished }>
                    <Toggle time={350} delay={!openMenuItem ? 450: 0} className={"c-block_item"} animClass={"c-block_item--fade-in"} toggle={openMenuItem} callBack={ !openMenuItem ? this.menuTrigger : undefined }>
                        <div className="c-block_item-test">Words</div> 
                    </Toggle>
                    <Toggle time={350} delay={!openMenuItem ? 300: 150} className={"c-block_item"} animClass={"c-block_item--fade-in"} toggle={openMenuItem}>
                        <div className="c-block_item-test">More Words</div> 
                    </Toggle>
                    <Toggle time={350} delay={!openMenuItem ? 150: 300} className={"c-block_item"} animClass={"c-block_item--fade-in"} toggle={openMenuItem}>
                        <div className="c-block_item-test">Even More Words</div> 
                    </Toggle>
                    <Toggle time={350} delay={!openMenuItem ? 0: 450} className={"c-block_item"} animClass={"c-block_item--fade-in"} toggle={openMenuItem} callBack={ openMenuItem ? this.animationFinished : undefined }>
                        <div className="c-block_item-test">Even Even More Words.</div> 
                    </Toggle>
                </Toggle>
            </div>

        );

    }
}