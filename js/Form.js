// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Input from "./Input.js";
import Message from "./Message.js";
import Rule from "./Rule.js";
import Validation from "./Validation.js";

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
     * @param {array} [props.rules] Form rules.
     * @param {array} [props.messages] Form messages.
     * @param {object} [state] Form state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {boolean} [state.valid=true] Form valid state.
     * @param {object} [callbacks] Form callbacks:
     * @param {object} [callbacks.submit] Form submit callback:
     * @param {function} [callbacks.submit.function] Form submit function callback.
     * @param {object} [callbacks.submit.params] Form submit params.
     * @param {object} [callbacks.valid] Form valid callback:
     * @param {function} [callbacks.valid.function] Form valid function callback.
     * @param {object} [callbacks.valid.params] Form valid params.
     * @param {object} [callbacks.invalid] Form invalid callback:
     * @param {function} [callbacks.invalid.function] Form invalid function callback.
     * @param {object} [callbacks.invalid.params] Form invalid params.
     * @memberof Form
     */
    constructor (props = {
        id: 'form-1',
        rules: [],
        messages: [],
    }, state = {
        submit: true,
        valid: false,
    }, callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
    }, invalid: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }}) {
        super({ ...Form.props, ...props }, { ...Form.state, ...state });
        this.setCallbacks({ ...Form.callbacks, ...callbacks });
        let instance = this;
        this.parseRules();
        this.parseMessages();
        this.setHTML(`form#${ this.props.id }`);
        this.html.addEventListener('submit', function(e){
            e.preventDefault();
            Validation.validate(instance);
        });
        this.setSubmitButton();
        this.setInputs();
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
        this.buttons.submits = document.querySelectorAll(`.form-submit.${ this.props.id }`);
        for (const btn of this.buttons.submits) {
            btn.addEventListener('click', function(e){
                e.preventDefault();
                Validation.validate(instance);
            });
        }
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
     * * Get the Messages from an Input.
     * @param {Input} input Input.
     * @returns {Message}
     * @memberof Form
     */
    getMessagesFromInput (input) {
        let messages = [];
        for (const message of this.props.messages) {
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

    /**
     * * Adds a Form validation error.
     * @param {string} target Error target.
     * @param {string} message Error message.
     * @memberof Form
     */
    addInvalidErrors (target = '', message = '') {
        if (!this.erros) {
            this.errors = {};
        }
        if (!this.errors[target]) {
            this.errors[target] = [];
        }
        this.errors[target].push(message);
    }

    /**
     * * Set the Form Rules.
     * @memberof Form
     */
    parseRules () {
        this.setProps('rules', Rule.generate(this.props.rules));
    }

    /**
     * * Set the Form Messages.
     * @memberof Form
     */
    parseMessages () {
        this.setProps('messages', Message.generate(this.props.messages));
    }

    /**
     * * Removes a Form validation error.
     * @param {string} target Error target.
     * @memberof Form
     */
    removeInvalidErrors (target = '') {
        if (this.errors) {
            if (this.errors.hasOwnProperty(target)) {
                delete this.errors[target];
            }
        }
    }

    /**
     * * Refresh the Form Inputs.
     * @memberof Form
     */
    refreshInputs () {
        for (const input of this.inputs) {
            if (!input.htmls.length) {
                for (const newInput of Input.getAllDomHTML(this)) {
                    if (newInput.htmls.length) {
                        if (newInput.props.name === input.props.name) {
                            for (const html of newInput.htmls) {
                                switch (html.nodeName) {
                                    case 'INPUT':
                                        if (input.props.type !== html.type) {
                                            input.setProps('type', html.type);
                                        }
                                        break;
                                    case 'SELECT':
                                        if (input.props.type !== 'select') {
                                            input.setProps('type', 'select');
                                        }
                                        break;
                                }
                                input.setHTMLs(html, this);
                            }
                        }
                    }
                }
            }
        }
    }

    /** 
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'validation-1',
        rules: [],
        messages: [],
    }
    
    /** 
     * @static
     * @var {object} state Default state.
     */
    static state = {
        // ? submit: true,
        ignore: [],
    }
    
    /** 
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
    }, invalid: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }}
};

// ? Default export
export default Form;