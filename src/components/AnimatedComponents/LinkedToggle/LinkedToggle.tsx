import * as React from 'react';
import { animationHelpers } from '../../Helpers/animationHelpers'
import { CheckHeight } from '../CheckHeight/CheckHeight';

interface Props {

}

interface State {
    open: boolean;
    isAnimated: boolean;
}

class LinkedToggle extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);

        this.state = {
            isAnimated: false,
            open: true,
        }

        this.toggle = this.toggle.bind(this);
        this.isAnimated = this.isAnimated.bind(this);
    }

    toggle() {

        if (!this.state.isAnimated) {
            this.setState({
                isAnimated: true,
                open: !this.state.open
            });
        }

    }

    isAnimated() {
        this.setState({
            isAnimated: false
        });
    }

    render() {

        const { open } = this.state;

        return(

            <div>
                <button type="button" onClick={this.toggle}>Switch</button>
                <CheckHeight time={500} open={open}>
                    <div className={"c-anim_one"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cumque, eligendi rem unde, consequuntur vitae, placeat quidem amet doloribus molestias ea enim asperiores perspiciatis est ipsa tempora! Aliquid, iusto inventore!
                    </div>
                </CheckHeight>
                <CheckHeight time={800} open={!open} callback={this.isAnimated}>
                    <div className={"c-anim_two"}>
                        { this.props.children }
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quibusdam magni quidem quod omnis recusandae corporis aliquid sequi quis esse, quia maxime voluptates repudiandae assumenda, vero illum animi atque odio?
                    </div>
                </CheckHeight>
            </div>

        );

    }

}

export { LinkedToggle };