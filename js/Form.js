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
     * @param {Boolean} properties.submit Form submit boolean.
     * @param {Object} rules Form rules.
     * @param {Object} messages Form messages.
     * @memberof Form
     */
    constructor(properties = {
        id: 'validation-1',
        submit: true,
    }, rules = [], messages = []){
        this.setProperties(properties);
        this.setStates();
        this.setHTML();
        this.setSubmitButton();
        this.setInputs();
        this.setRules(rules);
        this.setMessages(messages);
    }

    /**
     * * Set the Form properties.
     * @param {Object} properties Form properties.
     * @param {String} properties.id Form ID.
     * @param {Boolean} properties.submit Form submit boolean.
     * @memberof Form
     */
    setProperties(properties = {
        id: 'validation-1',
        submit: true,
    }){
        this.properties = {};
        this.setId(properties);
        this.setSubmit(properties);
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
     * * Set the Validation submit boolean.
     * @param {Object} properties Validation properties.
     * @param {Boolean} properties.submit Validation submit boolean.
     * @memberof Validation
     */
    setSubmit(properties = {
        submit: true,
    }){
        if (properties.hasOwnProperty('submit')) {
            this.properties.submit = properties.submit;
        } else {
            this.properties.submit = true;
        }
    }

    /**
     * * Returns the Validation submit boolean.
     * @returns {Object} The Validation submit boolean.
     * @memberof Validation
     */
    getSubmit(){
        return this.properties.submit;
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
            switch (this.states.valid) {
                case true:
                    if(this.getHTML().classList.contains('invalid')){
                        this.getHTML().classList.remove('invalid');
                    }
                    this.getHTML().classList.add('valid');
                    break;
                case false:
                    if(this.getHTML().classList.contains('valid')){
                        this.getHTML().classList.remove('valid');
                    }
                    this.getHTML().classList.add('invalid');
                    break;
            }
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
        let instance = this;
        this.html = document.querySelector(`form#${this.getId()}`);
        this.html.addEventListener('submit', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
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
        this.btnSubmit = document.querySelector(`.form-submit.${this.getId()}`);
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
     * @param {Object} rules Form rules.
     * @memberof Form
     */
    setRules(rules = []){
        this.rules = Rule.getAll(rules);
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
     * @param {Object} rules Form messages.
     * @memberof Form
     */
    setMessages(messages = []){
        this.messages = Message.getAll(messages);
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