import * as React from 'react';
import { animationHelpers } from '../../Helpers/animationHelpers'
import { resolve } from 'q';
import { CheckHeight } from '../CheckHeight/CheckHeight';

interface Props {
}

interface State {
    error: boolean;
    mountError: boolean;
}

class MockForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.unMountError = this.unMountError.bind(this);

        this.state = { 
            error: false,
            mountError: false
        }
    }

    handleOnChange( event ) {

        if (event.target.value) {

            let reg = new RegExp('^[0-9]+$');

            if (!reg.test(event.target.value)) {
                this.setState({
                    mountError: true,
                    error: true
                });                
            } else {
                this.setState({
                    error: false
                }); 
            }

        }

    }

    unMountError() {

        this.setState({
            mountError: false
        }); 

    }

    render() {

        const { error, mountError } = this.state;

        return(

            <div>
                <input className={"c-input " + (error ? "c-input--error": "")} type="text"onChange={ e => this.handleOnChange( e ) }/>

                {mountError && <CheckHeight time={300} open={error} callback={ error ? null : this.unMountError } animateOnStart={true}>
                    <span className="c-validation-error"> Please enter a number to continue </span>
                </CheckHeight>}

            </div>

        );

    }

}

export { MockForm };
