// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Input from "./Input.js";
import Message from "./Message.js";
import Rule from "./Rule.js";
import Validation from "./Validation.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'validation-1',
};

/** @var {object} defaultState Default state. */
const defaultState = {
    // ? submit: true,
    ignore: [],
};

/**
 * * Form controls the <form> created.
 * @export
 * @class Form
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Form extends Class {
    /**
     * * Creates an instance of Form.
     * @param {object} [props] Form properties:
     * @param {string} [props.id='form-1'] Form primary key.
     * @param {object} [state] Form state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {boolean} [state.valid=true] Form valid state.
     * @param {array} [rules] Form rules.
     * @param {array} [messages] Form messages.
     * @memberof Form
     */
    constructor (props = {
        id: 'form-1',
    }, state = {
        submit: true,
        valid: false,
    }, rules = [], messages = []) {
        super({ ...deafultProps, ...props }, { ...defaultState, ...state });
        let instance = this;
        this.setHTML(`form#${ this.props.id }`);
        this.html.addEventListener('submit', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
        this.setSubmitButton();
        this.setInputs();
        this.setRules(rules);
        this.setMessages(messages);
    }

    /**
     * * Set the Form submit button HTML Element.
     * @memberof Form
     */
    setSubmitButton () {
        let instance = this;
        if (!this.buttons) {
            this.buttons = {};
        }
        this.buttons.submit = document.querySelector(`.form-submit.${ this.props.id }`);
        this.buttons.submit.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
    }

    /**
     * * Set the Form Inputs.
     * @memberof Form
     */
    setInputs(){
        this.inputs = Input.getAllDomHTML(this);
    }

    /**
     * * Return a Form Input.
     * @param {string} name Input name.
     * @returns {Input}
     * @memberof Form
     */
    getInputByName (name) {
        for (const input of this.inputs) {
            if(input.props.name == name){
                return input;
            }
        }
    }

    /**
     * * Set the Form Rules.
     * @param {array} [rules] Form rules.
     * @memberof Form
     */
    setRules (rules = []) {
        this.rules = Rule.generate(rules);
    }

    /**
     * * Set the Form Messages.
     * @param {array} [messages] Form messages.
     * @memberof Form
     */
    setMessages (messages = []) {
        this.messages = Message.generate(messages);
    }

    /**
     * * Get the Messages from an Input.
     * @param {Input} input Input.
     * @returns {Message}
     * @memberof Form
     */
    getMessagesFromInput (input) {
        let messages = [];
        for (const message of this.messages) {
            if (message.props.target == input.props.name) {
                messages.push(message);
            }
        }
        return messages;
    }

    /**
     * * Change the Form valid state.
     * @param {boolean} value Status value.
     * @memberof Form
     */
     changeValidaState (value = false) {
        this.setState('valid', value);
        if (this.state.valid) {
            if (this.html.classList.contains('invalid')) {
                this.html.classList.remove('invalid');
            }
            this.html.classList.add('valid');
        } else {
            if (this.html.classList.contains('valid')) {
                this.html.classList.remove('valid');
            }
            this.html.classList.add('invalid');
        }
    }
};

// ? Default export
export default Form;