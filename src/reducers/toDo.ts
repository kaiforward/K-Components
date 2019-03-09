import { ADD_TODO, TOGGLE_TODO, COMPLETE, INCOMPLETE, ALL } from '../actions/toDo'; 
import ToDo from '../components/ToDo/ToDo';

const initialState = {
    toDos: [],
    title: "",
    text: "",
    mode: ALL
};

export default function(state: any = initialState, action: any) {

    switch (action.type) {

        case ADD_TODO: {
            const { uniqueId, text, title, isComplete, date } = action.payload;
            return { 
                ...state,
                toDos: [{ uniqueId, title, text, date, isComplete }, ...state.toDos]
            };
        }

        case TOGGLE_TODO: {
            const { uniqueId, isComplete, date } = action.payload;
            const { toDos } = state;
            toDos.forEach((element: ToDoItem) => {
                if (element.uniqueId == uniqueId) {
                    element.isComplete = isComplete;
                    element.date = date;
                }
            });
            return {
                ...state,
                toDos: [...toDos]
            }
        }

        case INCOMPLETE: case COMPLETE: case ALL: {
            const { type } = action;
            return {
                ...state,
                mode: type
            }
        } 
    
        default:
            return {
                ...state
            }
    }
}