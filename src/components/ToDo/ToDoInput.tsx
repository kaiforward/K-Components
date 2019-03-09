import * as React from 'react';

interface TodoInputProps {
    value: string,
    elementType: string;
    onChangeAction: any
}

interface ToDoInputState {
    // empty
}

class ToDoInput extends React.Component<TodoInputProps, ToDoInputState> {
    
    static defaultProps = {
        textValue: ""
    }

	constructor(props: TodoInputProps) {
        super(props);
    }

    render() {

        const { value, onChangeAction, elementType } = this.props;

        return(
            <div>
                <input 
                    className={"c-todo_input"}
                    onChange={event => onChangeAction( event )}
                    value={value}
                    data-element-type={elementType}
                    type="text"/>
            </div>
        )
    }
}

export { ToDoInput };