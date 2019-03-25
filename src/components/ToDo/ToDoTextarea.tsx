import * as React from 'react';

interface Props {
    value: string,
    elementType: string;
    onChangeAction: any
}

interface State {
    text: string
}

class ToDoTextArea extends React.Component<Props, State> {
    
    static defaultProps = {
        value: ""
    }

	constructor(props: Props) {
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