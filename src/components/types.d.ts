
declare interface AnimationProps {

    styles?: Object;
    easing?: string;
    time: number;
    delay?: number;
    classNames?: Array<string>;
    switchClass?: string;
    switchStyle?: Object;

}

declare interface TimeProps {
    time: number;
    delay: number;
}

declare interface Classes {
    [key: string]: string
}