import * as React from 'react';
import { connect, ReactReduxContext } from "react-redux";
import { addToDo, toggleToDo, removeToDo } from "../../actions/toDo";
import store from "../../store/store";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { CheckHeight } from '../AnimatedComponents/CheckHeight/CheckHeight';

interface Props {
    isOpen: boolean;
    uniqueId: string;
    title: string;
    text: string;
    date: string;
    isComplete: boolean;
    animationTime: number;
}

interface State {
    shouldRemove: boolean
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
        this.handleRemoveToDo = this.handleRemoveToDo.bind(this);
        this.animationFinished = this.animationFinished.bind(this);

        this.state = {
            shouldRemove: false
        }
    }

    handleCompleteToDo() {

        const { uniqueId, isComplete } = this.props;

        store.dispatch(toggleToDo({
            uniqueId: uniqueId,
            isComplete: !isComplete,
            date:  new Date().toDateString() + ' ' + new Date().toTimeString()
        }));

    };

    handleRemoveToDo = () => {

        this.setState({
            shouldRemove: true
        })

    };

    animationFinished() {
        
        const { uniqueId } = this.props;

        if (uniqueId) {

            store.dispatch(removeToDo({
                uniqueId
            }));      

        }
    }
    
    render() {

        const { uniqueId, title, text, date, isComplete, isOpen, animationTime } = this.props;
        const { shouldRemove } = this.state;

        return(
            <CheckHeight time={animationTime} animateOnStart={true} open={shouldRemove ? false : isOpen} callback={shouldRemove ? this.animationFinished : null}>
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
                        <button className="c-todo_button" onClick={ this.handleRemoveToDo }>Remove Todo</button>              
                    </div>
                </div>                 
            </CheckHeight>
        )
    }

}

export default connect(
    null,
    { toggleToDo, removeToDo }
)(ToDoItem);