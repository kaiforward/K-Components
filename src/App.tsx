import * as React from 'react';
import './scss/styles.scss';
import { ToolTip } from './components/ToolTip/ToolTip';
import { Popup } from './components/Popup/Popup';
import { Slide, Slider } from './components/Slider/Slider';
import { Panel, Accordion } from './components/Accordion/Accordion';
import { Toggle } from './components/Toggle/Toggle';
import { Menu } from './components/AnimatedComponents/Menu/Menu';
import { Switch } from './components/AnimatedComponents/Switch/Switch';
import { themes } from './components/AnimatedComponents/Switch/style';
import ToDo from './components/ToDo/ToDo';
import { CheckHeight } from './components/AnimatedComponents/CheckHeight/CheckHeight';
import { LinkedToggle } from './components/AnimatedComponents/LinkedToggle/LinkedToggle';
import { Thingy } from './components/Three/Thingy';


class App extends React.Component {
	render() {
		return (

			<div className="o-wrapper">

				<LinkedToggle>
					<div className="o-form-item">
						Popup Image
							<Popup
							buttonOpen={
								<img style={{ width: "100%" }} src="https://picsum.photos/400/300" alt="" />
							}
							buttonClose={
								<div className="o-button u-right">
									<button className="c-button"> Close </button>
								</div>
							}>
							<img className="popup-image" src="https://picsum.photos/400/300" alt="" />
						</Popup>
					</div>
				</LinkedToggle>
				<hr/>

				<ToDo/>

   				<div className="o-form-item">
   					<Menu animateOnStart={true}></Menu>
   				</div>

   				<hr/>

   				<div className="o-form-item">
   					<Menu></Menu>
   				</div>
				
   				<div className="o-form-item">
   					Popup Image
             			<Popup
						buttonOpen={
							<img style={{ width: "100%" }} src="https://picsum.photos/400/400" alt="" />
						}
						buttonClose={
							<div className="o-button u-right">
								<button className="c-button"> Close </button>
							</div>
						}>
						<img className="popup-image" src="https://picsum.photos/400/400" alt="" />
					</Popup>
				</div>
				
				<div>
					<Slider
						buttonNext={<button className="c-slider_button-inner c-slider_button-inner--next u-abs">next</button>}
						buttonPrev={<button className="c-slider_button-inner c-slider_button-inner--prev u-abs">prev</button>}>
						<Slide theme={'c-slide--theme-1'}>
							<img className="c-slider_image" src="https://picsum.photos/600/400" alt="" />
							<p className={'u-mobile-only'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quidem, doloremque saepe tenetur vitae possimus! Beatae minima soluta maxime officiis ad explicabo voluptates distinctio magni tenetur voluptate ab, commodi praesentium.</p>
						</Slide>
						<Slide theme={'c-slide--theme-1'}>
							<img className="c-slider_image" src="https://picsum.photos/400/600" alt="" />
						</Slide>
						<Slide theme={'c-slide--theme-1'}>
							<img className="c-slider_image" src="https://picsum.photos/300/400" alt="" />
							<p className={'u-mobile-only'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate cumque maiores dicta enim, voluptates ducimus ratione. Libero vel neque perspiciatis voluptatibus impedit similique quisquam ipsa officia quod. Porro, adipisci a.</p>
						</Slide>
						<Slide theme={'c-slide--theme-1'}>
							<img className="c-slider_image" src="https://picsum.photos/400/300" alt="" />
						</Slide>
					</Slider>
				</div>
				
				<div className="o-form-item">
					ToolTip
          			<div className="u-relative">
						<ToolTip
							alignment={"top"}
							triggerElement={
								<input className="c-input" type="text" />
							}
							tooltipText={
								<div>
									<label> Tooltip Title </label>
									<p><small> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae necessitatibus magni, maxime esse vitae veniam accusamus quasi inventore illo aspernatur sequi. Sequi veritatis iure laudantium consectetur voluptatum dolorem. Minus, quisquam! </small></p>
								</div>
							}
						/>
					</div>
				</div>

				<div className="o-form-item">
					Accordion
          			<Accordion>
						<Panel
							title={"One"}>
							<div className="u-relative">
								<ToolTip
									alignment={"bottom-left"}
									triggerElement={
										<p> what is this? </p>
									}
									tooltipText={
										<div>
											<label> Tooltip Title </label>
											<p><small> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae necessitatibus magni, maxime esse vitae veniam accusamus quasi inventore illo aspernatur sequi. Sequi veritatis iure laudantium consectetur voluptatum dolorem. Minus, quisquam! </small></p>
										</div>
									}
								/>								
							</div>
							<div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est minima quae nihil nobis aliquid quis eveniet et illum earum ex ipsam, quisquam tenetur voluptate quo culpa a. Rem, aspernatur harum!
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus atque at quod omnis aut excepturi earum ut unde, perspiciatis dignissimos dolores non ipsum nemo. Dolore totam voluptatibus fugit velit ut!l
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim harum rem, vel saepe ad nam ab tempora nemo aliquam voluptatem obcaecati voluptates maiores molestias labore? Assumenda tenetur voluptatem nam dolorem.</div>
						</Panel>
						<Panel title={"Two"}>
							<div className="o-form-item"> 
								<img className={"u-fleft-image"} src="https://gradientjoy.com/200x300" alt=""/>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis similique deserunt assumenda dignissimos magnam id voluptas beatae, doloribus ex molestias, esse ipsa nam quo expedita incidunt odio ullam cum accusamus.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, veniam quam voluptatem, deleniti error tenetur corrupti expedita animi saepe magnam ullam neque quod beatae perspiciatis doloremque iure libero tempore sequi?
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed placeat distinctio aliquam quasi minima, voluptatibus sunt accusamus sequi, aliquid ea culpa illum non cum dolor mollitia laudantium in blanditiis. Similique.	 
							</div>
						</Panel>
						<Panel title={"Three"}>
							<div className="o-form-item">
								Popup Image
								<Popup
									buttonOpen={
										<img style={{ width: "100%" }} src="https://picsum.photos/400/400" alt="" />
									}
									buttonClose={
										<div className="o-button u-right">
											<button className="c-button"> Close </button>
										</div>
									}
								>
									<img className="popup-image" src="https://picsum.photos/400/400" alt="" />
								</Popup>
							</div>
						</Panel>
						<Panel title={"Four"}>
							<div className="o-form-item">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quis perferendis, repellat totam quibusdam reprehenderit delectus? Eligendi, est qui aliquid illum aliquam, alias, ipsam sit consequuntur dicta in vel ab.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsum at ex sequi, commodi minus temporibus, culpa, sed veritatis reiciendis nemo tempora quo nesciunt a nobis. Iusto error doloremque voluptas.
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio nemo, commodi voluptas corporis distinctio cupiditate dolorum nesciunt itaque voluptatibus libero, sapiente repudiandae, tenetur tempora exercitationem explicabo maxime assumenda alias possimus.
							</div>
						</Panel>
					</Accordion>
				</div>
				
			</div>

		);
	}
}

export default App;
