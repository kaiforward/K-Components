import * as React from 'react';
import { connect } from "react-redux";
import { setVisibility } from "../../actions/toDo";
import store from "../../store/store";

interface Props {
    mode: string
}

interface State {
    // empty
}

class ToDoMode extends React.Component<Props, State> {
    
    static defaultProps = {
        mode: 'ALL'
    }

	constructor(props: Props) {
        super(props);
        this.setModeAction = this.setModeAction.bind(this);
    }

    setModeAction() {

        const { mode } = this.props;

        mode && store.dispatch(setVisibility(mode));

    }

    render() {

        const { children } = this.props;
        return(
            <button type="button" className={"c-todo_button"} onClick={ this.setModeAction }>{ children }</button>
        );

    }
}

export default connect(
    null,
    { setVisibility }
)(ToDoMode);