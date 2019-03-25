import * as React from 'react';

interface Props {
    value: string,
    elementType: string;
    onChangeAction: any
}

interface State {
    // empty
}

class ToDoInput extends React.Component<Props, State> {
    
    static defaultProps = {
        textValue: ""
    }

	constructor(props: Props) {
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