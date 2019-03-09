import * as React from 'react';
import { setVisibility } from "../../actions/toDo";
import store from "../../store/store";

interface TodoModeProps {
    mode: string
}

interface ToDoModeState {
    // empty
}

class ToDoMode extends React.Component<TodoModeProps, ToDoModeState> {
    
    static defaultProps = {
        mode: 'ALL'
    }

	constructor(props: TodoModeProps) {
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
            <button className={"c-todo_button"} onClick={ this.setModeAction }>{ children }</button>
        );

    }
}

export { ToDoMode };