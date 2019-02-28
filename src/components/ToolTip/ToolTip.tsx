import * as React from 'react';

interface ToolTipProps {
    alignment: string, 
    tooltipClass?: string, 
    tooltipText?: any, 
    tooltipTextTransition?: string, 
    tooltipTextTheme?: string, 
    triggerElement?: any, 
    triggerElementClass?: string, 
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
			tooltipClass, 
			tooltipText, 
			tooltipTextTransition, 
			tooltipTextTheme, 
			triggerElement, 
			triggerElementClass, 
			customPlacement  
		} = this.props;
		
		const alignClasses: string = 'c-tooltip_text c-tooltip_text--'+alignment+' ';
		const styleClasses: string = ( tooltipTextTheme ? tooltipTextTheme : '') + ' ' + ( this.state.open ? tooltipTextTransition: '' );
		
		return(
			
			<div className={ 'c-tooltip ' + ( tooltipClass ? tooltipClass : '' ) }>
				<div onClick={ this.handleClick } className={ triggerElementClass ? triggerElementClass : '' }>
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
