
declare interface AnimationProps {
    styles?: Object;
}

declare interface TimeProps {
    time: number;
    delay: number;
}

declare interface Classes {
    [key: string]: string
}

declare interface ToDoItem {
    uniqueId: string;
    text: string;
    title: string;
    isComplete: boolean;
    date: string;
}

declare interface ToDoText {
    title: string,
    text: string
}
