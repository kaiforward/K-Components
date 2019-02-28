
export const animationHelpers: any = {  
    
    /*
    ** Pass Animation Props and a target element and the styles will be applied to the chosen element
    */
    animate: function(animProps: AnimationProps, element: HTMLElement) {

        const { easing, time, styles, delay } = animProps;

        element && styles && Object.keys(styles).forEach(function(key) {
            element.style["transitionDelay"] = `${delay / 1000}s`;
            element.style["transitionDuration"] = `${time / 1000}s`
            element.style["transitionTimingFunction"] = `${easing}`;
            element.style.transitionProperty = 'all';
            element.style[`${key}`] = `${styles[key]}`; 
        });     

    },

    /*
    ** Set inline styling for transition delay and transition duration 
    */
    setTransitionTiming: function(timeProps: TimeProps, element: HTMLElement) {

        const { time, delay } = timeProps;
        if (element) {
            // if delay or time is 0 remove inline styling, 0 equates to no style at all. fallsback on class styling
            element.style["transitionDelay"] = delay ? `${delay / 1000}s` : "";
            element.style["transitionDuration"] = time ? `${time / 1000}s`: "";
     
        } 

    },

    /*
    ** Iterate through list of classes and add them to chosen element
    */
    addClasses: function(classNames: Array<string>, element: HTMLElement) {
        // iterate through list of classes and add them to chosen element
        element && classNames && classNames.forEach(className => {
            if (className && className.length > 0) {
                element.classList.add(className);
            }
        });        

    },

    /*
    ** Iterate through list of classes and remove them from the chosen element
    */    
    removeClasses: function(classNames: Array<string>, element: HTMLElement) {
        // iterate through list of classes and remove them from the chosen element
        element && classNames && classNames.forEach(className => {
            if (className && (element.classList.contains(className))) {
                element.classList.remove(className);                  
            }
        });        

    },

    /*
    ** Use promise and set timeout to create timer for use in await / async
    */
    timer: function(animationTime: number){
        return new Promise((resolve , reject)=>{
            setTimeout(()=>{
                resolve();
            }, animationTime)
        });
    },

}