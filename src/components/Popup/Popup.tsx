import * as React from 'react';

interface PopupProps {
    buttonOpen: any, 
    buttonClose: any, 
    windowClass: string, 
    windowOpenClass: string
}
interface PopupState {
    open: boolean
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
			open: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({
			open: !this.state.open
		});
	}

	render() {

		const { buttonOpen, buttonClose, windowClass, windowOpenClass } = this.props;
		return(

			<div className={ 'c-popup' }>
				<div className="c-popup_button-open" onClick={ this.handleClick }> { buttonOpen } </div>
				<div className={ windowClass + ' ' + (this.state.open ? windowOpenClass : '') }>
					<div className="c-popup_button-close" onClick={ this.handleClick }> { buttonClose } </div>
					{ this.props.children }
				</div>
			</div>

		);

	}

}

export { Popup };