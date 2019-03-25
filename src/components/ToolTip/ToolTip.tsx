import * as React from 'react';

interface ToolTipProps {
    alignment: string,
    tooltipText?: any, 
    triggerElement?: any, 
    customPlacement?: any  
}
interface ToolTipState {
    open: boolean
}

class ToolTip extends React.Component<ToolTipProps, ToolTipState> {

    constructor(props: ToolTipProps) {
        super(props);
        this.state = {
			open: false
		}
		this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {

    }

	handleClick = () => {
		this.setState({
			open: !this.state.open
		})
	}

	render() {
		
		const { 
			alignment,
			tooltipText, 
			triggerElement,  
			customPlacement  
		} = this.props;
		const { open } = this.state;
		
		const alignClasses: string = 'c-tooltip_text c-tooltip_text--'+alignment;
		const styleClasses: string = open ? ' c-tooltip_text--open': '' ;
		
		return(
			
			<div className={ 'c-tooltip'}>
				<div onClick={ this.handleClick }>
					{ triggerElement }
				</div>
				<div className={ alignClasses + styleClasses } style={ customPlacement }>
					{ tooltipText }
				</div>
			</div>
			
        );
    }

}

export { ToolTip };
