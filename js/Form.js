// ? ValidationJS repository.
import { Input } from "./Input.js";
import { Message } from "./Message.js";
import { Rule } from "./Rule.js";
import { Validation } from "./Validation.js";

/**
 * * Form controls the <form> created.
 * @export
 * @class Form
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Form{
    /**
     * * Creates an instance of Form.
     * @param {Object} [properties] Form properties:
     * @param {String} [properties.id] Form ID.
     * @param {Object} [states] Form states.
     * @param {Boolean} [states.submit] Form submit boolean status.
     * @param {Boolean} [states.valid] Form valid boolean status.
     * @param {Array} [rules] Form rules.
     * @param {Array} [messages] Form messages.
     * @memberof Form
     */
    constructor(properties = {
        id: 'form-1',
    }, states = {
        submit: true,
        valid: false,
    }, rules = [], messages = []){
        this.setProperties(properties);
        this.setStates(states);
        this.setStates();
        this.setHTML();
        this.setSubmitButton();
        this.setInputs();
        this.setRules(rules);
        this.setMessages(messages);
    }

    /**
     * * Set the Form properties.
     * @param {Object} [properties] Form properties:
     * @param {String} [properties.id] Form ID.
     * @memberof Form
     */
    setProperties(properties = {
        id: 'form-1',
    }){
        this.properties = {};
        this.setIDProperty(properties);
    }

    /**
     * * Returns the Form properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Form
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
     * @memberof Form
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
     * @memberof Form
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
     * * Set the Form ID.
     * @param {Object} [properties] Form properties:
     * @param {String} [properties.id] Form ID.
     * @memberof Form
     */
    setIDProperty(properties = {
        id: 'form-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'form-1';
        }
    }

    /**
     * * Returns the Form ID.
     * @returns {String}
     * @memberof Form
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Form states.
     * @param {Object} [states] Form states:
     * @param {Boolean} [states.submit] Form submit boolean status.
     * @param {Boolean} [states.valid] Form valid boolean status.
     * @memberof Form
     */
    setStates(states = {
        submit: true,
        valid: false,
    }){
        this.states = {};
        this.setSubmitStatus(states);
        this.setValidStatus(states);
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Form
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
     * @memberof Form
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
     * @memberof Form
     */
    changeStatus(status = '', value = ''){
        if (this.hasStates(status)) {
            this.states[status] = value;
        }
        switch (status) {
            case 'valid':
                if (this.getStates('valid')) {
                    if(this.getHTML().classList.contains('invalid')){
                        this.getHTML().classList.remove('invalid');
                    }
                    this.getHTML().classList.add('valid');
                } else {
                    if(this.getHTML().classList.contains('valid')){
                        this.getHTML().classList.remove('valid');
                    }
                    this.getHTML().classList.add('invalid');
                }
                break;
        }
    }
    
    /**
     * * Set the Form submit boolean status.
     * @param {Object} [states] Form states:
     * @param {Boolean} [states.submit] Form submit boolean status.
     * @memberof Form
     */
    setSubmitStatus(states = {
        submit: true,
    }){
        if (states.hasOwnProperty('submit')) {
            this.states.submit = states.submit;
        } else {
            this.states.submit = true;
        }
    }

    /**
     * * Returns the Form submit boolean status.
     * @returns {Boolean}
     * @memberof Form
     */
    getSubmitStatus(){
        return this.states.submit;
    }
    
    /**
     * * Set the Form valid boolean status.
     * @param {Object} [states] Form states:
     * @param {Boolean} [states.valid] Form valid boolean status.
     * @memberof Form
     */
    setValidStatus(states = {
        valid: false,
    }){
        if (states.hasOwnProperty('valid')) {
            this.states.valid = states.valid;
        } else {
            this.states.valid = false;
        }
    }

    /**
     * * Returns the Form valid boolean status.
     * @returns {Boolean}
     * @memberof Form
     */
    getValidStatus(){
        return this.properties.valid;
    }

    /**
     * * Set the Form HTML Element.
     * @memberof Form
     */
    setHTML(){
        let instance = this;
        this.html = document.querySelector(`form#${ this.getProperties('id') }`);
        this.html.addEventListener('submit', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
    }

    /**
     * * Returns the Form HTML Element.
     * @returns {HTMLElement}
     * @memberof Form
     */
    getHTML(){
        return this.html;
    }

    /**
     * * Set the Form submit button HTML Element.
     * @memberof Form
     */
    setSubmitButton(){
        let instance = this;
        this.btnSubmit = document.querySelector(`.form-submit.${ this.getProperties('id') }`);
        this.btnSubmit.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
    }

    /**
     * * Returns the Form submit button HTML Element.
     * @returns {HTMLElement}
     * @memberof Form
     */
    getSubmitButton(){
        return this.btnSubmit;
    }

    /**
     * * Set the Form Inputs.
     * @memberof Form
     */
    setInputs(){
        this.inputs = Input.getAllDomHTML(this);
    }

    /**
     * * Returns the Form Inputs.
     * @param {String} name Input name.
     * @returns {Input[]|Input}
     * @memberof Form
     */
    getInputs(name = false){
        if (name) {
            for (const input of this.inputs) {
                if(input.getProperties('name') == name){
                    return input;
                }
            }
        } else {
            return this.inputs;
        }
    }

    /**
     * * Set the Form Rules.
     * @param {Array} [rules] Form rules.
     * @memberof Form
     */
    setRules(rules = []){
        this.rules = Rule.generate(rules);
    }

    /**
     * * Returns the Form Rules.
     * @returns {Array}
     * @memberof Form
     */
    getRules(){
        return this.rules;
    }

    /**
     * * Set the Form Messages.
     * @param {Array} [messages] Form messages.
     * @memberof Form
     */
    setMessages(messages = []){
        this.messages = Message.generate(messages);
    }

    /**
     * * Returns the Form Messages.
     * @returns {Array}
     * @memberof Form
     */
    getMessages(){
        return this.messages;
    }

    /**
     * * Get the Messages from an Input.
     * @param {Input} input Input.
     * @returns {Message}
     * @memberof Form
     */
    getMessagesFromInput(input = undefined){
        let messages = [];
        for (const message of this.getMessages()) {
            if(message.getProperties('target') == input.getProperties('name')){
                messages.push(message);
            }
        }
        return messages;
    }

    /**
     * * Get the CKEditor value
     * @param {Input[]} selected All the Inputs selected.
     * @returns {Input[]}
     * @memberof Form
     */
    getCKEditor(selected){
        for(let input of selected){
            if(input.HTML && input.HTML.classList.contains('ckeditor')){
                let HTML = CKEDITOR.instances[input.HTML.id].getSnapshot();
                let div = document.createElement("div");
                div.innerHTML = HTML;
                let plain_text = (div.textContent || div.innerText);
                input.HTML.value = plain_text;
            }
        }
        return selected;
    }
};