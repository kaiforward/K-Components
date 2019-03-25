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

		const { position, theme, translateX, siblings } = this.props;

		let zPos: number = 0; 
		let transitionDuration: string = '0';

		// if a slide is 2 spaces before the end or 1 space before the start set tranition duration to 0
		// if its position is not a multiple of 100 touch controls are being used so also set tranition duration to 0
		if ( position > translateX * ( (siblings*2) -2 ) || position < -translateX * (siblings - 2 ) || position % 100 !== 0.0 ) {			
			transitionDuration = '0.0s'
		} else {
			transitionDuration = '0.5s'
		} 

		const styles: object = {
			transitionDuration: `${transitionDuration}`,
			transform: `translate3d(${position}%, 0%, ${zPos}px)`,
		}

		return(

			<div className={'c-slide ' + theme} style={ styles }>
				{ this.props.children }
			</div>

		);

	}
}

interface SliderProps {
	translateX: number,
	buttonNext?: any,
	buttonPrev?: any,
}

interface SliderState {
    InitialSlides: number,
	slidePositions: Array<number>,
	height: number,
	active: number
}

class Slider extends React.Component<SliderProps, SliderState> {

	private trackRef: React.RefObject<HTMLInputElement>;

	private touchStart: number = 0;
	private touchEnd: number = 0;
	private touchMove: number = 0;
	private touchPrev: number = 0;

	private distance: number = 0;
	private isTouched: boolean = false;
	 
	private mouseDown: number = 0;
	private mouseUp: number = 0;
	private mouseMove: number = 0;
	private mousePrev: number = 0;

	static defaultProps = {
		translateX: 100
    }
    
    constructor(props: SliderProps) {
        super(props);

        this.trackRef = React.createRef();
		
		const positionStates: Array<number> = [];
		const children: number = React.Children.count(this.props.children);
		const { translateX } = this.props;
		let active: number = 0;

		// we clone images twice to have a buffer zone around images, especially if we want an offset
		for(var i = 0; i < children*3; i++) {
			positionStates.push( (-children * translateX) + i* translateX);
			if (positionStates[i] == 0) {
				active = i;
			}
		}

		this.state = {
			slidePositions: positionStates,
			InitialSlides: children,
			height: 0,
			active: active
		} 
		
		this.handleClick = this.handleClick.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
    }

	componentDidMount() {
		this.onImageLoad();
		this.setDraggable();
		window.addEventListener("resize", this.handleResize);
	}

	componentWillUnmount() {
		document.removeEventListener('resize', this.handleResize);
	}

	setDraggable = () => {

		if (this.trackRef.current) {

			let images: HTMLCollectionOf<HTMLImageElement> = this.trackRef.current.getElementsByTagName('img');
			let anchors: HTMLCollectionOf<HTMLAnchorElement> = this.trackRef.current.getElementsByTagName('a');
			for (var i = 0; i < images.length; i++) {
				images[i].setAttribute('draggable', 'false');
			} 
			for (var i = 0; i < anchors.length; i++) {
				anchors[i].setAttribute('draggable', 'false');
			} 

		}

	}

	onImageLoad = () => {
		// get the first slide in the slider, and set container height after load by measuring all images in that single slide

		if ( this.trackRef.current ) {
			const sliderTrackFirstChild: Element = this.trackRef.current.children[this.state.active];
			const slideImages: HTMLCollectionOf<HTMLImageElement> = sliderTrackFirstChild.getElementsByTagName('img');

			let allLoaded: number = 0;
			if (slideImages.length) {
				for (var i = 0; i < slideImages.length; i++) {
					slideImages[i].onload = (event) => {
						allLoaded++;
						allLoaded === slideImages.length ? this.handleResize() : null;
						console.log('Images Loaded');
					}	
				}		
			}						
		}

	}

	handleResize = () => {

		let newHeight: number = 0;
		// read height of child that is active in the state
		if (this.trackRef.current != null) {
			newHeight = this.trackRef.current.children[this.state.active].clientHeight;
		}
		this.setState({
			height: newHeight,
		});
	}

    handleTouch = ( event : React.TouchEvent<HTMLDivElement> ) => {

		if  (event.type == 'touchstart') {

			this.touchStart = event.changedTouches[0].screenX;
            this.touchPrev = event.changedTouches[0].screenX;
			this.isTouched = true;
			
		}

		if  (event.type == 'touchmove') {

			this.touchMove = event.changedTouches[0].screenX;
			this.distance = this.touchPrev - this.touchMove;
			this.movesSlides( Math.round( -this.distance / 5 ) ); 
			this.touchPrev = this.touchMove;
			this.isTouched = true;

		}

		if  (event.type == 'touchend' || event.type == 'touchcancel') {

			this.touchEnd = event.changedTouches[0].screenX;

			if ( this.touchEnd > this.touchStart ) {
				this.movesSlides(0, true, 'right'); 
			} else if ( this.touchEnd < this.touchStart ) {
				this.movesSlides(0, true, 'left'); 
			}

			this.isTouched = false;

		}

	}
	
	handleMouse = ( event : React.MouseEvent<HTMLDivElement> ) => {

		console.log(event, event.type);

		if (event.type === 'mousedown') {

			this.mouseDown = event.screenX;
			this.mousePrev = event.screenX;

			this.isTouched = true;

		}

		if (event.type === 'mousemove') {

			if (this.isTouched) {

				this.mouseMove = event.screenX;
				this.distance = this.mousePrev - this.mouseMove;
				this.movesSlides( Math.round( -this.distance / 5 ) )
				this.mousePrev = this.mouseMove;

			}

		}
		
		if (event.type === 'mouseup' || event.type === 'mouseleave') {
			
			this.mouseUp = event.screenX;

			if (this.mouseUp > this.mouseDown) {
				this.movesSlides(0, true, 'right'); 
			} else if ( this.mouseUp < this.mouseDown ) {
				this.movesSlides(0, true, 'left'); 
			}

			this.isTouched = false;

		}

	}

    movesSlides = ( amount: number, snap? : boolean, side? : string ) => {

        const { translateX } = this.props;
		const { slidePositions, InitialSlides } = this.state;
		const positionStates: Array<number> = [ ...slidePositions ];
		let difference: number = 0;
		let activeSlide: number = 0;
		// HOW DID I GET THIS TO WORK
        for (var i = 0; i < positionStates.length; i++) {
			
			if (snap) {
				if ( positionStates[i] % translateX != 0 ) {
					positionStates[i] = side === 'left' ? Math.floor(positionStates[i]/100)*100 : Math.ceil(positionStates[i]/100)*100;
				}
			} 
			else {
				positionStates[i] += amount;
			}
			
			if ( positionStates[i] > (InitialSlides*2) * translateX) {

				difference = (positionStates[i] % translateX);
				positionStates[i] = ((InitialSlides - (this.isTouched ? 0 : 1)) * -translateX) + difference;
				
			} 
			else if ( positionStates[i] < InitialSlides * -translateX ) {

				difference = (positionStates[i] % translateX);        
				positionStates[i] = ( ((InitialSlides*2) - (this.isTouched ? 0 : 1)) * translateX) + difference;
										
			}

			if (positionStates[i] > -5 && positionStates[i] < 95) {
				activeSlide = i;
			}

		}
		
        this.setState({
			slidePositions: positionStates,
			active: activeSlide
		}, () => {
			// resize on callback after active slide has been set
			this.handleResize();
		});	
    }
	
	handleClick = ( direction: string ) => {

		const { translateX } = this.props;
		direction === 'next' ? this.movesSlides( -translateX ) : this.movesSlides( translateX );

	}

    render() {

        const { InitialSlides, slidePositions } = this.state;
		const { translateX } = this.props;

        return(

			<div 
				className="c-slider"
                onTouchStartCapture={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
                onTouchMoveCapture={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
                onTouchEndCapture={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
                onTouchCancelCapture={ ( event : React.TouchEvent<HTMLDivElement> ) => this.handleTouch( event ) }
				onMouseDownCapture={ ( event : React.MouseEvent<HTMLDivElement> ) => this.handleMouse( event ) }
				onMouseUpCapture={ ( event : React.MouseEvent<HTMLDivElement> ) => this.handleMouse( event ) }
				onMouseLeave={ ( event : React.MouseEvent<HTMLDivElement> ) => this.handleMouse( event ) }
				onMouseMoveCapture={ ( event : React.MouseEvent<HTMLDivElement> ) => this.handleMouse( event ) }>

					<div className="c-slider_buttonNext" onClick={ (event) => this.handleClick('next')}>
						{ this.props.buttonNext }
					</div>
					<div className="c-slider_buttonPrev" onClick={ (event) => this.handleClick('prev')}>
						{ this.props.buttonPrev }
					</div>
					<div 
					ref={ this.trackRef } 
					className="c-slider_track"
					style={ { height: `${this.state.height}px` } }>
						{ // clones 1
							React.Children.map(this.props.children, (child, i) => {
								return React.cloneElement(child as React.ReactElement<any>, {
									position: slidePositions[i],
									siblings: InitialSlides,
									translateX: translateX
								});
							})
						}
						{ // clones 2
							React.Children.map(this.props.children, (child, i) => {
								return React.cloneElement(child as React.ReactElement<any>,{
									position: slidePositions[i+ InitialSlides],
									siblings: InitialSlides,
									translateX: translateX
								});
							})
						}
						{ // clones 3
							React.Children.map(this.props.children, (child, i) => {
								return React.cloneElement(child as React.ReactElement<any>, {
									position: slidePositions[i + InitialSlides*2],
									siblings: InitialSlides,
									translateX: translateX
								});
							})
						}
				</div>

			</div>

        );

    }

}

export { Slide, Slider };