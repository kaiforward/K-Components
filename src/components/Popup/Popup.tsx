import * as React from 'react';
import { Toggle } from '../Toggle/Toggle';

interface PopupProps {
    buttonOpen: any, 
    buttonClose: any, 
    windowClass: string, 
    windowOpenClass: string
}
interface PopupState {
	open: boolean,
	mountWindow: boolean,
	isAnimated: boolean
}

class Popup extends React.Component<PopupProps, PopupState> {

    static defaultProps = {
        buttonOpen: <button>Open</button>,
        buttonClose: <button>Close</button>,
        windowClass: 'c-popup_window',
        windowOpenClass: 'c-popup_window--open'
    }

	constructor(props: PopupProps) {
		super(props);
		this.state = {
			open: false,
			mountWindow: false,
			isAnimated: false
		}
		this.openWindow = this.openWindow.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.unMountWindow = this.unMountWindow.bind(this);
		this.unsetAnimationState = this.unsetAnimationState.bind(this);
	}

	openWindow() {
		this.setState({
			isAnimated: true,
			open: true,
			mountWindow: true
		});
	}

	closeWindow() {
		this.setState({
			open: false
		});
	}

	unMountWindow() {
		this.setState({
			mountWindow: false,
			isAnimated: false
		});
	}

	unsetAnimationState() {
		this.setState({
			isAnimated: false
		});		
	}

	render() {

		const { buttonOpen, buttonClose, windowClass, windowOpenClass } = this.props;
		const { open, mountWindow } = this.state;

		return(

			<div className={'c-popup'}>
				<div className="c-popup_button-open" onClick={ this.openWindow }> {buttonOpen} </div>
				{mountWindow && <Toggle time={500} toggle={open} delay={0} className={windowClass} animClass={windowOpenClass} callBack={!open ? this.unMountWindow : this.unsetAnimationState}>
					<div className="c-popup_button-close" onClick={ this.closeWindow }> {buttonClose} </div>
					{ this.props.children }				
				</Toggle>}
			</div>

		);

	}

}

export { Popup };