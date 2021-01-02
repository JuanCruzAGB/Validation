/**
 * * Support controls the support tooltip.
 * @export
 * @class Support
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Support{
    /**
     * * Creates an instance of Support.
     * @param {Object} [properties] Support properties:
     * @param {String} [properties.id] Support ID.
     * @param {String} [properties.type] Support type.
     * @param {Object} [states] Support states:
     * @param {HTMLElemet} html Support HTML Element.
     * @memberof Support
     */
    constructor(properties = {
        id: 'support-1',
        type: 'box',
    }, states = {}, html = undefined){
        this.setHTML(html);
        this.setProperties(properties);
        this.setStates(states);
    }

    /**
     * * Set the Support properties.
     * @param {Object} [properties] Support properties:
     * @param {String} [properties.id] Support ID.
     * @param {String} [properties.type] Support type.
     * @memberof Support
     */
    setProperties(properties = {
        id: 'support-1',
        type: 'box',
    }){
        this.properties = {};
        this.setIDProperty(properties);
        this.setTypeProperty(properties);
    }

    /**
     * * Returns the Support properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Support
     */
    getProperties(property = ''){
        if (property && property != '') {
            return this.properties[property];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} property Property name.
     * @returns {Boolean}
     * @memberof Support
     */
    hasProperty(property = ''){
        if (this.properties.hasOwnProperty(property)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} property Property name.
     * @param {*} value Property value.
     * @memberof Support
     */
    changeProperty(property = '', value = ''){
        if (this.hasProperty(property)) {
            this.properties[property] = value;
        }
        switch (property) {
            default:
                break;
        }
    }

    /**
     * * Set the Support ID.
     * @param {Object} [properties] Support properties:
     * @param {String} [properties.id] Support ID.
     * @memberof Support
     */
    setIDProperty(properties = {
        id: 'support-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'support-1';
        }
    }

    /**
     * * Returns the Support ID.
     * @returns {String}
     * @memberof Support
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Support type.
     * @param {Object} [properties] Support properties:
     * @param {String} [properties.type] Support type.
     * @memberof Support
     */
    setTypeProperty(properties = {
        type: 'box',
    }){
        if (properties.hasOwnProperty('type')) {
            this.properties.type = properties.type;
        } else {
            if (this.getHTML().classList.contains('support-box')) {
                this.properties.type = 'box';
            } else {
                this.properties.type = 'tooltip';
            }
        }
    }

    /**
     * * Returns the Support type.
     * @returns {String}
     * @memberof Support
     */
    getTypeProperty(){
        return this.properties.type;
    }

    /**
     * * Set the Support states.
     * @param {Object} [states] Support states:
     * @memberof Support
     */
    setStates(states = {}){
        this.states = {};
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Support
     */
    getStates(property = ''){
        if (property && property != '') {
            return this.states[property];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {String} name Status name.
     * @returns {Boolean}
     * @memberof Support
     */
    hasStates(name = ''){
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {String} status Status name.
     * @param {*} value Status value.
     * @memberof Support
     */
    changeStatus(status = '', value = ''){
        if (this.hasStates(status)) {
            this.states[status] = value;
        }
        switch (status) {
            default:
                break;
        }
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
     * @returns {HTMLElement}
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
        switch(this.getProperties('type')){
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
        switch(this.getProperties('type')){
            default:
                this.getHTML().innerHTML = '';
                this.getHTML().classList.add('hidden');
                break;
        }
    }

    /**
     * * Get the Support HTML Element.
     * @static
     * @param {Input} input Parent Input.
     * @returns {Support}
     * @memberof Support
     */
    static getDomHTML(input = undefined){
        let html;
        if(html = document.querySelector(`form#${ input.getProperties('id') } .support-${ input.getProperties('name') }`)){
            return new this({
                id: `${ input.getProperties('id') }-support`,
            }, {}, html);
        }
    }
}