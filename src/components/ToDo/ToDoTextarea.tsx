import * as React from 'react';

interface TodoTextareaProps {
    value: string,
    elementType: string;
    onChangeAction: any
}

interface ToDoTextareaState {
    text: string
}

class ToDoTextArea extends React.Component<TodoTextareaProps, ToDoTextareaState> {
    
    static defaultProps = {
        value: ""
    }

	constructor(props: TodoTextareaProps) {
        super(props);
    }

    render() {

        const { value, onChangeAction, elementType } = this.props;

        return(
            <div>
                <textarea 
                    className={"c-todo_textarea"}
                    onChange={event => onChangeAction( event )}
                    value={value}
                    data-element-type={elementType}/>
            </div>
        )
    }
}

export { ToDoTextArea };