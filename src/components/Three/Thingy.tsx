import * as React from 'react';
import * as THREE from 'three';

interface Props {
  
}
interface State {

}

class Thingy extends React.Component<Props, State> {

    private ref = null;
    private camera = null;
    private scene = null;
    private renderer = null;
    private geometry = null;
    private material = null;
    private mesh = null;

    constructor(props: Props) {
        super(props);

        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.ref = React.createRef();

    }

    init() {
    
        this.camera = new THREE.PerspectiveCamera( 70, 400 / 400, 0.01, 10 );
        this.camera.position.z = 1;
    
        this.scene = new THREE.Scene();
    
        this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        this.material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );

        this.mesh.rotation.y = Math.PI / 4;

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( 400, 400 );
        this.ref.current.appendChild( this.renderer.domElement );
    
    }
    
    animate() {
    
        requestAnimationFrame( this.animate );
    
        // this.mesh.rotation.y += 0.01;
    
        this.renderer.render( this.scene, this.camera );
    
    }

    componentDidMount() {

        this.init();
        this.animate();

    }

    static defaultProps = {

    }

	render() {
		
		return(
			
            <div ref={this.ref}></div>
			
        );
    }

}

export { Thingy };
 
