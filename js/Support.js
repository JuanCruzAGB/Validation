/**
 * * Support controls the support tooltip.
 * @export
 * @class Support
 */
export class Support{
    /**
     * * Creates an instance of Support.
     * @param {HTMLElemet} html Support HTML Element.
     * @memberof Support
     */
    constructor(html = undefined){
        this.setHTML(html);
        this.setProperties();
    }

    /**
     * * Set the Support properties.
     * @memberof Support
     */
    setProperties(){
        this.properties = {};
        this.setType();
    }

    /**
     * * Returns the Support properties.
     * @returns {Object} The Support properties.
     * @memberof Support
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Input type.
     * @memberof Input
     */
    setType(){
        if (this.getHTML().classList.contains('support-box')) {
            this.properties.type = 'box';
        } else {
            this.properties.type = 'tooltip';
        }
    }

    /**
     * * Returns the Support type.
     * @returns {String} The Support type.
     * @memberof Support
     */
    getType(){
        return this.properties.type;
    }

    /**
     * * Set the Support HTML Element.
     * @param {HTMLElement} html Support HTML Element.
     * @memberof Support
     */
    setHTML(html = undefined){
        this.html = html;
    }

    /**
     * * Returns the Support HTML Element.
     * @returns {HTMLElement} The Support HTML Element.
     * @memberof Support
     */
    getHTML(){
        return this.html;
    }
    
    /**
     * * Add the message to the Support.
     * @param {String} message Message to add.
     * @memberof Support
     */
    addError(message = ''){
        switch(this.properties.type){
            default:
                this.getHTML().innerHTML = message;
                this.getHTML().classList.remove('hidden');
                break;
        }
    }

    /**
     * * Remove the Support error.
     * @memberof Support
     */
    removeError(){
        switch(this.getType()){
            case 'box':
                this.getHTML().innerHTML = '';
                this.getHTML().classList.add('hidden');
                break;
        }
    }

    /**
     * * Get the Support HTML Element.
     * @static
     * @param {Input} input Parent Input.
     * @returns {Support} A new Suport.
     * @memberof Support
     */
    static getHTML(input = undefined){
        let html;
        if(html = document.querySelector(`form#${input.getId()} .support-${input.getName()}`)){
            return new this(html);
        }
    }
}