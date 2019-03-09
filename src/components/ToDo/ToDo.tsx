import * as React from 'react';
import { connect, ReactReduxContext } from "react-redux";
import { addToDo, toggleToDo, INCOMPLETE, COMPLETE, ALL } from "../../actions/toDo";
import store from "../../store/store";
import { element } from 'prop-types';
import ToDoItem from './ToDoItem';
import { ToDoInput } from './ToDoInput';
import { ToDoTextArea } from './ToDoTextarea';
import { Toggle } from '../Toggle/Toggle';
import { ToDoMode } from './ToDoMode';

interface TodoProps {
    toDoItems: Array<any>;
    mode: string;
    toDoAction: any;
    completeToDoAction: any;
}

interface ToDoState {
    text: string;
    title: string;
}

class ToDo extends React.Component<TodoProps, ToDoState> {
    
    static defaultProps = {
        toDoItems: [],
        mode: ALL,
    }

	constructor(props: TodoProps) {
        super(props);
        this.state = { 
            text: "",
            title: "" 
        };
        this.handleAddToDo = this.handleAddToDo.bind(this);
        this.updateInput = this.updateInput.bind(this); 
        this.updateText = this.updateText.bind(this);
    }
    
    updateInput = ( event: any ) => {
        
        const { value } = event.target;
        this.setState({ 
            title: value
        });

    };

    updateText = ( event: any ) => {

        const { value } = event.target;
        this.setState({ 
            text: value
        });   

    }

    handleAddToDo = () => {

        const { toDoAction, toDoItems } = this.props;
        const { title, text } = this.state;

        if (text && title) {

            store.dispatch(toDoAction({
                uniqueId: title+toDoItems.length.toString(),
                text: text,
                title: title,
                isComplete: false,
                date: new Date().toDateString() + ' ' + new Date().toTimeString()
            }));
            this.setState({ 
                text: "",
                title: ""
            });       

        }

    };

    render() {

        const { toDoItems, mode } = this.props;
        const { text, title } = this.state;

        return(
            <div className={"c-todo"}>
				<h1>To Do</h1>
                <label>Title</label>
                <ToDoInput value={title} onChangeAction={ this.updateInput } elementType={'text'}/>
                <label>TextArea</label>
                <ToDoTextArea value={text} onChangeAction={ this.updateText } elementType={'textarea'}/>
                <button className="c-todo_button" onClick={this.handleAddToDo}>Add Todo</button>
                <ToDoMode mode={ALL}>All</ToDoMode>
                <ToDoMode mode={COMPLETE}>Complete</ToDoMode>
                <ToDoMode mode={INCOMPLETE}>Incomplete</ToDoMode>           
                <div className="c-todo_list">  
                {
                    toDoItems.map((element, index) => {
                        const isVisible: boolean = Boolean((mode === COMPLETE && element.isComplete) || (mode === INCOMPLETE && !element.isComplete) || (mode === ALL));
                        return (
                            <Toggle key={ element.uniqueId+`_${index}`+'_TOGGLE' } toggle={!isVisible} time={600} delay={index * 100} className={"c-todo_anim"} animClass={"c-todo_anim--hide"}>
                                <ToDoItem 
                                    key={ element.uniqueId }
                                    uniqueId={ element.uniqueId } 
                                    title={ element.title } 
                                    text={ element.text } 
                                    date={ element.date } 
                                    isComplete={ element.isComplete }/>                                 
                            </Toggle>
                        );
                    })
                }    
                </div>                                          
            </div>

        );
    }

}

const mapStateToProps = (state: any) => {
    console.log(state);
    const { toDo } = state;
    return { 
        toDoItems: toDo.toDos,
        mode: toDo.mode,
        toDoAction: addToDo,
        completeToDoAction: toggleToDo
    };

}

export default connect(
    mapStateToProps,
    { addToDo, toggleToDo }
)(ToDo);
