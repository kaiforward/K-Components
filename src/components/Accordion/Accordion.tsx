import * as React from 'react';

interface PanelProps {
    open?: boolean, 
    title?: any, 
    handleClick?: any, 
    titleClass?: string,
    titleTransition?: string, 
    panelBodyClass?: string, 
    panelTransition?: string
}

class Panel extends React.Component<PanelProps> {

	constructor(props: PanelProps) {
		super(props);
    }
    
    static defaultProps = {
        open: false,
        titleClass: 'c-accordion_title',
        titleTransition: 'c-accordion_title--open',
        panelBodyClass: 'c-accordion_panel-body',
        panelTransition: 'c-accordion_panel-body--open'
    }

	render() {

		const { open, title, handleClick, titleClass, titleTransition, panelBodyClass, panelTransition } = this.props;

		return(

			<div className={ 'c-accordion_panel' }>
				<div onClick={ handleClick } className={ titleClass + ' ' + (open ? titleTransition : '') }>
					{ title } 
				</div>
				<div className={ panelBodyClass + ' ' + (open ? panelTransition : '') }>
					{ this.props.children }
				</div>
			</div>

		);

	}

}

interface AccordionProps {
    children: any, 
    accordionClass: string
}

interface AccordionState {
    open: Array<boolean>
}

class Accordion extends React.Component<AccordionProps, AccordionState> {

	constructor(props: AccordionProps) {
		super(props);

		const openStates: Array<boolean> = [];
		// Create number array reference for child objects
		for(var i = 0; i < React.Children.count(this.props.children); i++) {
			openStates.push(false);
		}

		this.state = {
			open: openStates
		}

		this.handleClick = this.handleClick.bind(this);

    }
    
    static defaultProps = {
        accordionClass: 'c-accordion'
    }

	handleClick = (section: number) => {
		// Copy state to reassign later so changes to single items in the array will still cause a re-render
		let openStates: Array<boolean> = [...this.state.open];

		for(var i = 0; i < openStates.length; i++) {
			openStates[i] = section === i ? !openStates[i] : openStates[i];
		}

		this.setState({
			open: openStates
		})

	}

	render() {

		const { children, accordionClass } = this.props;

		return(

			<div className={ accordionClass }>
				{
					React.Children.map(children, (child, i) => {
						return React.cloneElement(child, {
							open : this.state.open[i],
							handleClick: () => this.handleClick(i)
						});
					})
				}
			</div>

		);

	}

}

export { Panel, Accordion };