class Support{
    /**
     * Creates an instance of Support.
     * @param {string} selector
     * @param {Input} input
     * @memberof Support
     */
    constructor(selector, input){
        this.selector = selector;
        this.findSupport(input);
    }
    /**
     * Find the correct support HTML.
     * @param {Input} input
     * @memberof Support
     */
    findSupport(input){
        if(document.querySelectorAll(this.selector  + ' .support-box').length){
            this.findBox(input);
            this.type = 'box';
        }else{
            document.querySelector(this.selector).classList.add('support-tooltip');
            this.type = 'tooltip';
        }
    }
    /**
     * Find the support box HTML.
     * @param {Input} input
     * @memberof Support
     */
    findBox(input){
        let boxes = document.querySelectorAll(this.selector + ' .support-box');
        for(let i = 0; i < boxes.length; i++){
            if(input.array && i + 1 == input.array){
                this.box = boxes[i];
            }else if(!input.array){
                this.box = boxes[0];
            }
        }
    }
    /**
     * Add the message error.
     * @param {string} message
     * @memberof Support
     */
    addError(message){
        switch(this.type){
            case 'box':
                    this.box.innerHTML = message;
                    this.box.classList.add('showed');
                break;
            case 'tooltip':
                document.querySelector(this.selector).setAttribute('data-tooltip', message);
                document.querySelector(this.selector).classList.add('showed');
                break;
        }
    }
    /**
     * Remove the message error.
     * @memberof Support
     */
    removeError(){
        switch(this.type){
            case 'box':
                    this.box.classList.remove('showed');
                break;
            case 'tooltip':
                    document.querySelector(this.selector).removeAttribute('data-tooltip');
                    document.querySelector(this.selector).classList.remove('showed');
                break;
        }
    }
}