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
     * @param {object} properties - Form properties.
     * @param {string} number - The form number.
     * @memberof Form
     */
    constructor(properties = {
        id: 'validation-1'
    }, rules = [], messages = []){
        this.setProperties(properties);
        this.setHTML();
        this.setSubmitButton();
        this.setInputs();
        this.setRules(rules);
        this.setMessages(messages);
    }

    /**
     * * Set the Form properties.
     * @param {object} properties - Form properties.
     * @memberof Form
     */
    setProperties(properties = {
        id: 'validation-1'
    }){
        this.properties = {};
        this.setId(properties);
    }

    /**
     * * Set the Form ID.
     * @param {object} properties - Form properties.
     * @memberof Form
     */
    setId(properties = {
        id: 'validation-1'
    }){
        this.properties.id = properties.id;
    }

    /**
     * * Set the Form HTML Element.
     * @memberof Form
     */
    setHTML(){
        this.html = document.querySelector(`form#${this.properties.id}`);
    }

    /**
     * * Set the Form submit button HTML Element.
     * @memberof Form
     */
    setSubmitButton(){
        let instance = this;
        this.btnSubmit = document.querySelector(`.form-submit.${this.properties.id}`);
        this.btnSubmit.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
    }

    /**
     * * Set the Form Inputs.
     * @memberof Form
     */
    setInputs(){
        this.inputs = Input.getHTMLElements(this);
    }

    /**
     * * Set the Form Rules.
     * @memberof Form
     */
    setRules(rules = []){
        this.rules = Rule.getAll(rules);
    }

    /**
     * * Set the Form Messages.
     * @memberof Form
     */
    setMessages(messages = []){
        this.messages = Message.getAll(messages);
    }

    /**
     * * Get a Form Input.
     * @param {string} target - Rule target.
     * @returns
     * @memberof Form
     */
    getInput(target = undefined){
        for (const input of this.inputs) {
            if(input.properties.name == target){
                return input;
            }
        }
    }

    /**
     * * Get the Messages from an Input.
     * @param {Input} input - Input.
     * @returns
     * @memberof Form
     */
    getMessagesFromInput(input = undefined){
        let messages = [];
        for (const message of this.messages) {
            if(message.properties.target == input.properties.name){
                messages.push(message);
            }
        }
        return messages;
    }

    /**
     * Get the CKEditor value
     * @param {Input[]} selected - All the inputs selected.
     * @return {Input[]}
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