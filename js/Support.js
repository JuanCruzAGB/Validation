/**
 * * Support controls the support tooltip.
 * @export
 * @class Support
 */
export class Support{
    /**
     * Creates an instance of Support.
     * @param {string} selector
     * @param {Input} input
     * @memberof Support
     */
    /**
     * * Creates an instance of Support.
     * @param {HTMLElemet} html - Support HTML Element.
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
     * * Set the Input type.
     * @memberof Input
     */
    setType(){
        if(this.html.classList.contains('support-box')){
            this.properties.type = 'box';
        }else{
            this.type = 'tooltip';
        }
    }

    /**
     * * Set the Support HTML Element.
     * @param {HTMLElement} html - Support HTML Element.
     * @memberof Support
     */
    setHTML(html = undefined){
        this.html = html;
    }
    
    /**
     * * Add the message to the Support.
     * @param {string} message - Message to add.
     * @memberof Support
     */
    addError(message = ''){
        switch(this.properties.type){
            default:
                this.html.innerHTML = message;
                this.html.classList.remove('hidden');
                break;
        }
    }

    /**
     * * Remove the Support error.
     * @memberof Support
     */
    removeError(){
        switch(this.properties.type){
            case 'box':
                this.html.innerHTML = '';
                this.html.classList.add('hidden');
                break;
        }
    }

    /**
     * * Get the Support HTML Element.
     * @static
     * @param {object} properties - Input properties.
     * @returns
     * @memberof Support
     */
    static getHTML(properties = {
        id: 'validation-1',
        name: '',
    }){
        let html;
        if(html = document.querySelector(`form#${properties.id} .support-${properties.name}`)){
            return new this(html);
        }
    }
}