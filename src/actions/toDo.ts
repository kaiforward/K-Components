export const ADD_TODO: string = 'ADD_TODO';
export const REMOVE_TODO: string = 'REMOVE_TODO';
export const TOGGLE_TODO: string = 'TOGGLE_TODO';
export const UPDATE_TEXT: string = 'UPDATE_TEXT';
export const COMPLETE: string = 'COMPLETE';
export const INCOMPLETE: string = 'INCOMPLETE';
export const ALL: string = 'ALL';

export const addToDo = (payload: ToDoItem) => ({
    type: ADD_TODO,
    payload       
});

export const removeToDo = (payload: Partial<ToDoItem>) => ({
    type: REMOVE_TODO,
    payload     
});

export const toggleToDo = (payload: Partial<ToDoItem>) => ({
    type: TOGGLE_TODO,
    payload        
});

export const setVisibility = (type: string) => ({
    type: type    
});

export const updateText = ( payload: ToDoText ) => ({
    type: UPDATE_TEXT,
    payload
});