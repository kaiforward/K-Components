import * as React from 'react';
import { connect, ReactReduxContext } from "react-redux";
import { addToDo, toggleToDo, setVisibility, INCOMPLETE, COMPLETE, ALL } from "../../actions/toDo";
import store from "../../store/store";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";

interface Props {
    uniqueId: string;
    title: string;
    text: string;
    date: string;
    isComplete: boolean;
}

interface State {
    // empty
}

class ToDoItem extends React.Component<Props, State> {
    
    static defaultProps = {
        title: "",
        text: "",
        isComplete: false
    }

	constructor(props: Props) {
        super(props);
        this.handleCompleteToDo = this.handleCompleteToDo.bind(this);
    }

    handleCompleteToDo() {

        const { uniqueId, isComplete } = this.props;

        store.dispatch(toggleToDo({
            uniqueId: uniqueId,
            isComplete: !isComplete,
            date:  new Date().toDateString() + ' ' + new Date().toTimeString()
        }));

    };

    render() {

        const { uniqueId, title, text, date, isComplete } = this.props;

        return(
            <div className={"c-todo_item"}>
                <h3 className={"c-todo_item-title"+(isComplete ? " c-todo_item-title--is-complete" : "")}>
                    { title } - {!isComplete ? 'Incomplete' : 'Complete Huzzaaaaaaaah!' } 
                    <button
                        onClick={ this.handleCompleteToDo } 
                        className="c-todo_button c-todo_button--icon u-fright">
                        {!isComplete ? <IoIosClose /> : <IoIosCheckmark />}
                    </button>
                </h3>
                <div className={"c-todo_item-body"}>
                    <p className={"c-todo_item-text"}> { text } </p>
                    <p className={"c-todo_item-text"}> Updated : { date }</p>                
                </div>
            </div> 
        )
    }

}

export default connect(
    null,
    { toggleToDo }
)(ToDoItem);