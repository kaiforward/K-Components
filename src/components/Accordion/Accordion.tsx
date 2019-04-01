import * as React from 'react';
import { CheckHeight } from '../AnimatedComponents/CheckHeight/CheckHeight';

interface PanelProps {
    open?: boolean; 
	title?: any;
	callback?: any;
	time?: number;
    handleClick?: any; 
}

interface PanelState {
	
}

class Panel extends React.Component<PanelProps, PanelState> {

	constructor(props: PanelProps) {
		super(props);		
    }
    
    static defaultProps = {
        open: false,
		time: 300
	}

	render() {

		const { open, title, handleClick, callback, time } = this.props;

		return(

			<div className={ 'c-accordion_panel' }>
				<div onClick={ handleClick } className={ 'c-accordion_title ' + (open ? 'c-accordion_title--open' : '') }>
					{ title } 
				</div>
				<CheckHeight time={500} open={open} callback={callback}>
					<div className={ 'c-accordion_panel-body ' + (open ? 'c-accordion_panel-body--open' : '') }>
						{ this.props.children }
					</div>
				</CheckHeight>
			</div>

		);

	}

}

interface AccordionProps {
    children: any, 
    accordionClass: string
}

interface AccordionState {
	open: Array<boolean>;
	isAnimated: boolean;
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
			open: openStates,
			isAnimated: false,
		}

		this.handleClick = this.handleClick.bind(this);
		this.isAnimated = this.isAnimated.bind(this);

    }
    
    static defaultProps = {
        accordionClass: 'c-accordion'
    }

	handleClick = (section: number) => {

		if (!this.state.isAnimated) {

			// Copy state to reassign later so changes to single items in the array will still cause a re-render
			let openStates: Array<boolean> = [...this.state.open];

			for(var i = 0; i < openStates.length; i++) {
				openStates[i] = section === i ? !openStates[i] : openStates[i];
			}

			this.setState({
				open: openStates,
				isAnimated: true
			});
		}

	}

	isAnimated() {
		this.setState({
			isAnimated: false
		});
	}

	render() {

		const { children, accordionClass } = this.props;

		return(

			<div className={ accordionClass }>
				{
					React.Children.map(children, (child, i) => {
						return React.cloneElement(child, {
							open : this.state.open[i],
							handleClick: () => this.handleClick(i),
							callback: this.isAnimated
						});
					})
				}
			</div>

		);

	}

}

export { Panel, Accordion };