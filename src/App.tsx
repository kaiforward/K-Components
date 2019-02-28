import * as React from 'react';
import { ToolTip } from './components/ToolTip/ToolTip';
import { Popup } from './components/Popup/Popup';
import { Slide, Slider } from './components/Slider/Slider';
import { Panel, Accordion } from './components/Accordion/Accordion';
import { Toggle } from './components/Toggle/Toggle';
import { Menu } from './components/AnimatedComponents/Menu/Menu';
import { Switch } from './components/AnimatedComponents/Switch/Switch';
import { themes } from './components/AnimatedComponents/Switch/style';
import './scss/styles.scss';

class App extends React.Component {
	render() {
		return (

			<div className="o-wrapper">
				
				<div className="o-form-item">
					<Menu openOnStart={true}></Menu>
				</div>

				<hr/>

				<div className="o-form-item">
					<Menu></Menu>
				</div>

				<div className="o-form-item">
					<Switch classNames={themes.themeTwo}/>
				</div>	
				
				<div className="o-form-item">
					Popup Image
          			<Popup
						buttonOpen={
							<img style={{ width: "100%" }} src="https://via.placeholder.com/720" alt="" />
						}
						buttonClose={
							<div className="o-button u-right">
								<button className="c-button"> Close </button>
							</div>
						}>
						<img className="popup-image" src="https://via.placeholder.com/720" alt="" />
					</Popup>
				</div>
				
				<div>
					<Slider
						buttonNext={<button className="c-slider_button-inner c-slider_button-inner--next u-abs">next</button>}
						buttonPrev={<button className="c-slider_button-inner c-slider_button-inner--prev u-abs">prev</button>}>
						<Slide theme={'c-slide--theme-1'}>
							ONE
							<a href="/"><img className="c-slider_image" src="https://placeimg.com/640/480/any" alt="" /></a>
							<p className={'u-mobile-only'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quidem, doloremque saepe tenetur vitae possimus! Beatae minima soluta maxime officiis ad explicabo voluptates distinctio magni tenetur voluptate ab, commodi praesentium.</p>
						</Slide>
						<Slide theme={'c-slide--theme-1'}>
							TWO
							<img className="c-slider_image" src="https://placeimg.com/640/480/any" alt="" />
						</Slide>
						<Slide theme={'c-slide--theme-1'}>
							THREE
							<img className="c-slider_image" src="https://placeimg.com/640/480/any" alt="" />
							<p className={'u-mobile-only'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate cumque maiores dicta enim, voluptates ducimus ratione. Libero vel neque perspiciatis voluptatibus impedit similique quisquam ipsa officia quod. Porro, adipisci a.</p>
						</Slide>
					</Slider>
				</div>
				
				<div className="o-form-item">
					ToolTip
          			<div className="u-relative">
						<ToolTip
							alignment={"top"}
							customPlacement={{ width: '300px', left: '50%', transform: "translateX(-50%)" }}
							triggerElement={
								<input className="c-input" type="text" />
							}
							tooltipTextTransition={'c-tooltip_text--top-theme-2-open'}
							tooltipTextTheme={'c-tooltip_text--top-theme-2'}
							tooltipText={
								<div>
									<label> Tooltip Title </label>
									<p><small> This is some tooltip text Thiis some </small></p>
								</div>
							}
						/>
					</div>
				</div>

				<div className="o-form-item">
					Accordion
          			<Accordion>
						<Panel
							title={
								<p> Some words for the title </p>
							}>
							<p> Some words for the accordion </p>
						</Panel>
						<Panel title={"Two"}>
							<p> Some words for the accordion </p>
						</Panel>
						<Panel title={"Three"}>
							Popup Image
              				<Popup
								buttonOpen={
									<img style={{ width: "100%" }} src="https://placeimg.com/640/480/any" alt="" />
								}
								buttonClose={
									<div className="o-button u-right">
										<button className="c-button"> Close </button>
									</div>
								}
							>
								<img className="popup-image" src="https://placeimg.com/640/480/any" alt="" />
							</Popup>
						</Panel>
						<Panel title={"Four"}>
							<p> Some words for the accordion </p>
						</Panel>
					</Accordion>
				</div>
			</div>

		);
	}
}

export default App;
