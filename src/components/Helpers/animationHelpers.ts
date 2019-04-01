import { resolve } from "path";

export const animationHelpers: any = {

    /*
    ** Pass Animation Props and a target element and the styles will be applied to the chosen element
    */
    setStyle: function (styles: Classes, element: HTMLElement) {
        element && styles && Object.assign(element.style, styles);
    },

    /*
    ** Pass Animation Props and a target element and the styles will be removed the chosen element
    */
    removeStyle: function (styles: Classes, element: HTMLElement) {
        element && styles && Object.keys(styles).forEach(function (key) {
            element.style[`${key}`] = "";
        });
    },

    /*
    ** Set inline styling for transition delay and transition duration 
    */
    setTransitionTiming: function (timeProps: TimeProps, element: HTMLElement) {

        const { time, delay } = timeProps;
        if (element) {
            // if delay or time is 0 remove inline styling, 0 equates to no style at all. fallsback on class styling
            element.style["transitionDelay"] = delay ? `${delay / 1000}s` : "";
            element.style["transitionDuration"] = time ? `${time / 1000}s` : "";
        }

    },

    /*
    ** Iterate through list of classes and add them to chosen element
    */
    addClasses: function (classNames: Array<string>, element: HTMLElement) {
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
    removeClasses: function (classNames: Array<string>, element: HTMLElement) {
        // iterate through list of classes and remove them from the chosen element
        element && classNames && classNames.forEach(className => {
            if (className && (element.classList.contains(className))) {
                element.classList.remove(className);
            }
        });

    },

    /*
    ** Use promise and set timeout to create animation timer for use in await / async
    */
    timer: function (animationTime: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, animationTime)
        });
    },

    /*
    ** Use promise and set timeout to create animation timer for use in await / async
    */
    waitForAnimationFrame: function (animation: any, animationTime: number = 0) {
        return new Promise((resolve, reject) => {
            window && window.requestAnimationFrame(() => {
                console.log(animationTime);
                setTimeout(() => {
                    resolve();
                }, animationTime);
            });
        });
    },

    /*
    ** Use promise and requestAnimationFrame to transition to an elements natural height
    */
   transitionNaturalHeightTwo: (time: number) => {
            
        return animationHelpers.waitForAnimationFrame({bleh: 1}, time)
        .then(animationHelpers.waitForAnimationFrame({bleh: 1}, time))
        .then(animationHelpers.waitForAnimationFrame({bleh: 1}, time))
        .then(animationHelpers.waitForAnimationFrame({bleh: 1}, time))

    },
    /*
    ** Use promise and requestAnimationFrame to transition to an elements natural height
    */
    transitionNaturalHeight: async (element: HTMLElement, time: number, isOpen: boolean): Promise<any> => {

        let newHeight = 0;

        return new Promise(function (resolve, reject) {

            window && window.requestAnimationFrame(() => {

                // hide element 
                animationHelpers.setStyle({
                    visibility: "hidden",
                    transitionDuration: "0s",
                    height: ""
                }, element);

                newHeight = element.offsetHeight;
                console.log(newHeight);

                animationHelpers.setStyle({
                    visibility: "",
                    transitionDuration: `${time / 1000}s`,
                    height: isOpen ? "0px" : `${newHeight}px`
                }, element);

                resolve();

            });

        }).then(function () {

            return new Promise((resolve, reject) => {

                window && window.requestAnimationFrame(() => {

                    animationHelpers.setStyle({
                        height: isOpen ? `${newHeight}px` : "0px"
                    }, element);

                    setTimeout(() => {

                        animationHelpers.setStyle({
                            transitionDuration: "",
                            height: isOpen ? "" : "0px"
                        }, element);

                        resolve();

                    }, time);

                });

            });

        });

    }

}

animationHelpers.transitionNaturalHeightTwo(5000);