import * as React from 'react';

///////////// --------------------------///////
// HACK CITY ----------------------------->>>>
/////////// --------------------------///////

interface SlideProps {
	position: number,
	translateX : number,
	theme?: string,
	siblings: number
}

interface SlideState {

}

class Slide extends React.Component<SlideProps, SlideState> {

	constructor(props: SlideProps) {
		super(props);

	}
	
	static defaultProps = {
		position: 0,
		translateX: 100, 
		siblings: 0
	}

	render() {

		const { position, translateX, theme, siblings } = this.props;

		let active: boolean = false;
		let outsideBufferZone = false;
		let zPos: number = 0; 
		let transitionDuration: string = '0';

		if(position > translateX*(siblings+1) || position < -translateX*(siblings-1)) {
			outsideBufferZone = true;
			zPos = -500;
		} else if (position == 0) {
			active = true; 
			zPos = 0;
		}

		console.log(`${position % 100}`);

		if ( position % 100 !== 0.0 ) {			
			transitionDuration = '0.0s'
		} else {
			transitionDuration = '0.2s'
		}

		const styles: object = {
			transitionDuration: `${transitionDuration}`,
			transform: `translate3d(${position}%, 0%, ${zPos}px)`,
			position: active ? 'static' : 'absolute',
			opacity: outsideBufferZone ? '0' : '1',
		}

		return(

			<div className={'c-slide ' + theme} style={ styles }>
				{ this.props.children }
			</div>

		);

	}
}

interface SliderProps {
	nextButton?: any,
	prevButton?: any,
	translateX: number,
}

interface SliderState {
	height?: number,
	slidePositions: Array<number>,
	initialChildCount: number,
	firstSlide?: HTMLElement,
}

class Slider extends React.Component<SliderProps, SliderState> {
    
	private slickRef: React.RefObject<HTMLInputElement>;
	private touchStart: number = 0;
	private touchEnd: number = 0;
	private touchMove: number = 0;
	private touchCancel: number = 0;
	private touchPrev: number = 0;
	private distance: number = 0;
	private isTouched: boolean = false;

	constructor(props: SliderProps) {
        super(props);
		this.slickRef = React.createRef();
		
		const positionStates: Array<number> = [];
		const children: number = React.Children.count(this.props.children);
		const { translateX } = this.props;

		// we clone images twice to have a buffer zone around images, especially if we want an offset
		for(var i = 0; i < children*3; i++) {
			positionStates.push( (-children * translateX) + i* translateX);
		}

		this.state = {
			slidePositions: positionStates,
			initialChildCount: children,
		}	
		this.handleClick = this.handleClick.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.onImageLoad = this.onImageLoad.bind(this);

		this.handleTouch = this.handleTouch.bind(this);

	}

	static defaultProps = {
		translateX: 100,
		offset: 0
	}

	componentDidMount() {
		this.onImageLoad();
		window.addEventListener("resize", this.handleResize);
	}

	componentWillUnmount() {
		document.removeEventListener('resize', this.handleResize);
	}

	handleTouch = ( event : React.TouchEvent<HTMLDivElement> ) => {

		console.log(event.type);

		const { translateX } = this.props;

		if  (event.type == 'touchstart') {
			this.touchStart = event.changedTouches[0].screenX;
			this.touchPrev = event.changedTouches[0].screenX;
		}

		if  (event.type == 'touchmove') {

			this.touchMove = event.changedTouches[0].screenX;
			this.distance = this.touchPrev - this.touchMove;
			this.handleMove( -this.distance / 5 ); 
			this.touchPrev = this.touchMove;
			this.isTouched = true;
		}

		if  (event.type == 'touchend') {

			this.touchEnd = event.changedTouches[0].screenX;

			if ( this.touchEnd > this.touchStart ) {
				this.snapToNearestPoint('right');
			}
			if ( this.touchEnd < this.touchStart ) {
				this.snapToNearestPoint('left');
			}
			this.isTouched = false;
		}

		if  (event.type == 'touchcancel') {
			this.isTouched = false;
		}

	}

	handleMove = ( amount: number ) => {

		const positionStates: Array<number> = [ ...this.state.slidePositions ];
		const { initialChildCount } = this.state;
		const { translateX } = this.props;
		
		for(var i = 0; i < positionStates.length; i++) {
			positionStates[i] = positionStates[i] + amount;	

			// if slide moves above end position, move to start position
			if (positionStates[i] > translateX * ( (initialChildCount * 2 ))) {
				positionStates[i] = (initialChildCount-1) * -translateX;
			} // else if slide moves below start position, move to end position
			else if (positionStates[i] < (initialChildCount) * -translateX) {
				positionStates[i] = translateX * ( (initialChildCount * 2 )-1);
			} 
 
		}
		this.setState({
			slidePositions: positionStates
		});

	}

	handleResize = () => {

		// const positionStates: Array<number> = [ ...this.state.slidePositions ];
		// // Create number array reference for child objects
		// let newHeight: number = 0;
		// // MAYBE..... maybe....
		// const currentSlide: number = positionStates.filter( elem => elem === 0)[0];
		// if (this.slickRef.current != null) {
		// 	newHeight = this.slickRef.current.children[currentSlide].clientHeight;
		// }

		// this.setState({
		// 	height: newHeight,
		// });
	}

	onImageLoad = () => {
		// get the first slide in the slider, and set container height after load by measuring all images in that single slide
		const slideImages: HTMLCollectionOf<HTMLImageElement> | null = this.slickRef.current ? this.slickRef.current.children[0].getElementsByTagName('img') : null;
		let allLoaded: number = 0;
		if (slideImages !== null) {
			for (var i = 0; i < slideImages.length; i++) {
				slideImages[i].onload = (event) => {
					allLoaded++
					allLoaded === slideImages.length ? this.handleResize() : null;
					console.log('EVENT!');
				}	
			}		
		}
	}

	snapToNearestPoint( side: string ) {

		const positionStates: Array<number> = [ ...this.state.slidePositions ];
		const { initialChildCount } = this.state;

		const { translateX } = this.props;
		for(var i = 0; i < positionStates.length; i++) {
			if (positionStates[i] % translateX != 0) {

				positionStates[i] = side === 'left' ? Math.floor(positionStates[i]/100)*100 : Math.ceil(positionStates[i]/100)*100;

				// if slide moves above end position, move to start position
				if (positionStates[i] > translateX * ( (initialChildCount * 2 ))) {
					positionStates[i] = (initialChildCount-1) * -translateX;
				} // else if slide moves below start position, move to end position
				else if (positionStates[i] < (initialChildCount) * -translateX) {
					positionStates[i] = translateX * ( (initialChildCount * 2 )-1);
				} 
			}
		}
		this.setState({
			slidePositions: positionStates
		});
	}

	handleClick = ( amount: number ) => {

		if (!this.isTouched) {

			// Create number array reference for child objects
			const positionStates: Array<number> = [ ...this.state.slidePositions ];
			// original amount of slides, used for relative calculations with clones
			const { initialChildCount } = this.state;
			const { translateX } = this.props;
			let newHeight: number = 0;

			// MAYBE..... maybe.... sets start and end positions for slider based on slides found
			for(var i = 0; i < positionStates.length; i++) {
				// move position left or right

				positionStates[i] = positionStates[i] + amount;	

				// if slide moves above end position, move to start position
				if (positionStates[i] > translateX * ( (initialChildCount * 2 ))) {
					positionStates[i] = (initialChildCount) * -translateX;
				} // else if slide moves below start position, move to end position
				else if (positionStates[i] < (initialChildCount) * -translateX) {
					positionStates[i] = translateX * ( (initialChildCount * 2 ));
				} 
				// position equals zero, measure box height
				// if (positionStates[i] === 0) {
				// 	if (this.slickRef.current != null) {
				// 		newHeight = this.slickRef.current.children[i].clientHeight;
				// 	}
				// }
			}
			this.setState({
				height: newHeight,
				slidePositions: positionStates
			});

		}

	}
	
	render() {

		const { translateX } = this.props;
		const { initialChildCount } = this.state;
		return(

			<div className="c-slider"
				onTouchStart={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
				onTouchMove={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
				onTouchEnd={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
				onTouchCancel={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }>
				<div className="c-slider_buttonNext" onClick={ (event) => this.handleClick(-translateX) }>
					{ this.props.nextButton }
				</div>
				<div className="c-slider_buttonPrev" onClick={ (event) => this.handleClick(translateX) }>
					{ this.props.prevButton }
				</div>
				<div 
				ref={ this.slickRef } 
				className="c-slider_track c-slider_track--theme-1" 
				style={ { height: `${this.state.height}px` } }>
				{ // clones 1
					React.Children.map(this.props.children, (child, i) => {
						return React.cloneElement(child as React.ReactElement<any>, {
							position: this.state.slidePositions[i],
							translateX: translateX,
							siblings: React.Children.count(this.props.children)
						});
					})
				}
				{ // clones 2
					React.Children.map(this.props.children, (child, i) => {
						return React.cloneElement(child as React.ReactElement<any>,{
							position: this.state.slidePositions[i+ initialChildCount],
							translateX: translateX,
							siblings: React.Children.count(this.props.children)
						});
					})
				}
				{ // clones 3
					React.Children.map(this.props.children, (child, i) => {
						return React.cloneElement(child as React.ReactElement<any>, {
							position: this.state.slidePositions[i + initialChildCount*2],
							translateX: translateX,
							siblings: React.Children.count(this.props.children)
						});
					})
				}
				</div>
			</div>

		);
		
	}
	
}

export { Slide, Slider };