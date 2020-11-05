// * ValidationJS repository.
import { Input } from "./Input.js";
import { Message } from "./Message.js";
import { Rule } from "./Rule.js";
import { Validation } from "./Validation.js";

/**
 * * Form manage the <form> created.
 * @export
 * @class Form
 */
export class Form{
    /**
     * * Creates an instance of Form.
     * @param {Object} properties Form properties.
     * @param {String} properties.id Form ID.
     * @param {String} number The form number.
     * @memberof Form
     */
    constructor(properties = {
        id: 'validation-1'
    }){
        this.setProperties(properties);
        this.setStates();
        this.setHTML();
        this.setSubmitButton();
        this.setInputs();
        this.setRules();
        this.setMessages();
    }

    /**
     * * Set the Form properties.
     * @param {Object} properties Form properties.
     * @param {String} properties.id Form ID.
     * @memberof Form
     */
    setProperties(properties = {
        id: 'validation-1'
    }){
        this.properties = {};
        this.setId(properties);
    }

    /**
     * * Returns the Form properties.
     * @returns {Object} The Form properties.
     * @memberof Form
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Form states.
     * @memberof Form
     */
    setStates(){
        this.states = {}
        this.setValid();
    }

    /**
     * * Returns the Form states.
     * @returns {Object} The Form states.
     * @memberof Form
     */
    getStates(){
        return this.states;
    }

    /**
     * * Set the Form ID.
     * @param {Object} properties Form properties.
     * @param {String} properties.id Form ID.
     * @memberof Form
     */
    setId(properties = {
        id: 'validation-1'
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'validation-1';
        }
    }

    /**
     * * Returns the Form ID.
     * @returns {Object} The Form ID.
     * @memberof Form
     */
    getId(){
        return this.properties.id;
    }

    /**
     * * Set the Form valid state.
     * @param {Object} states Form states.
     * @param {Boolean} states.valid - Form valid state.
     * @memberof Form
     */
    setValid(states = {
        valid: false,
    }){
        if (states.hasOwnProperty('valid')) {
            this.states.valid = states.valid;
        } else {
            this.states.valid = false;
        }
    }

    /**
     * * Returns the Form valid state.
     * @returns {Boolean} The Form valid state.
     * @memberof Form
     */
    getValid(){
        return this.states.valid;
    }

    /**
     * * Set the Form HTML Element.
     * @memberof Form
     */
    setHTML(){
        this.html = document.querySelector(`#${this.getId()}`);
    }

    /**
     * * Returns the Form HTML Element.
     * @returns {HTMLElement} The Form HTML Element.
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
        this.btnSubmit = document.querySelector(`#${this.getId()} .form-submit`);
        this.btnSubmit.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
    }

    /**
     * * Returns the Form submit button HTML Element.
     * @returns {HTMLElement} The Form submit button HTML Element.
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
        this.inputs = Input.getAll(this);
    }

    /**
     * * Returns the Form Inputs.
     * @returns {Input[]} The Form Inputs.
     * @memberof Form
     */
    getInputs(){
        return this.inputs;
    }

    /**
     * * Set the Form Rules.
     * @memberof Form
     */
    setRules(){
        this.rules = Rule.getAll(JSON.parse((this.getHTML().dataset.rules)));
    }

    /**
     * * Returns the Form Rules.
     * @returns {Rule[]} The Form Rules.
     * @memberof Form
     */
    getRules(){
        return this.rules;
    }

    /**
     * * Set the Form Messages.
     * @memberof Form
     */
    setMessages(){
        this.messages = Message.getAll(JSON.parse((this.getHTML().dataset.messages)));
    }

    /**
     * * Returns the Form Messages.
     * @returns {Message[]} The Form Messages.
     * @memberof Form
     */
    getMessages(){
        return this.messages;
    }

    /**
     * * Get a Form Input.
     * @param {String} target Rule target.
     * @returns {Input} A Form Input.
     * @memberof Form
     */
    getInput(target = undefined){
        for (const input of this.getInputs()) {
            if(input.getName() == target){
                return input;
            }
        }
    }

    /**
     * * Get the Messages from an Input.
     * @param {Input} input Input.
     * @returns {Message} A Validation Message.
     * @memberof Form
     */
    getMessagesFromInput(input = undefined){
        let messages = [];
        for (const message of this.getMessages()) {
            if(message.getTarget() == input.getName()){
                messages.push(message);
            }
        }
        return messages;
    }

    /**
     * * Get the CKEditor value
     * @param {Input[]} selected All the Inputs selected.
     * @returns {Input[]} All the Inputs selected.
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