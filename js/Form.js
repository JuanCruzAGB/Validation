// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Input from "./Input.js";
import Message from "./Message.js";
import Rule from "./Rule.js";

/**
 * * Form controls the <form> created.
 * @export
 * @class Form
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Form extends Class {
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
        ignore: [],
        valid: false,
    }, callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
        }, invalid: {
            function: Form.defaultInvalid,
            params: {}
    }}) {
        super({ ...Form.props, ...props }, { ...Form.state, ...state });
        this.setCallbacks({ ...Form.callbacks, ...callbacks });
        let instance = this;
        this.setRules();
        this.setMessages();
        this.setHTML(`form#${ this.props.id }`);
        this.html.addEventListener('submit', function(e) {
            e.preventDefault();
            instance.validate();
        });
        this.setSubmitButton();
        this.setInputs();
    }

    /**
     * * Set the Form Inputs.
     * @memberof Form
     */
    setInputs () {
        this.inputs = Input.getAllDomHTML(this);
    }

    /**
     * * Set the Form Messages.
     * @memberof Form
     */
    setMessages () {
        this.setProps('messages', Message.generate(this.props.messages));
    }

    /**
     * * Set the Form Rules.
     * @memberof Form
     */
    setRules () {
        this.setProps('rules', Rule.generate(this.props.rules, this.state.ignore));
    }

    /**
     * * Set the Form submit button HTML Element.
     * @memberof Form
     */
    setSubmitButton () {
        const instance = this;
        if (!this.buttons) {
            this.buttons = {};
        }
        this.buttons = document.querySelectorAll(`.form-submit.${ this.props.id }`);
        for (const btn of this.buttons) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                instance.validate();
            });
        }
    }

    /**
     * * Change the Form valid state.
     * @param {boolean} value Status value.
     * @memberof Form
     */
    changeValidState (value = false) {
        this.setState('valid', value);
        if (this.state.valid) {
            this.html.classList.remove('invalid');
            this.html.classList.add('valid');
        }
        if (!this.state.valid) {
            this.html.classList.remove('valid');
            this.html.classList.add('invalid');
        }
    }

    /**
     * * Reloads the Form Inputs.
     * @memberof Form
     */
    reload () {
        for (const input of this.inputs) {
            input.reload(this);
        }
    }

    /**
     * * Validate the Form.
     * @param {string|false} [target=false] If just 1 Input has to be validated.
     * @returns {boolean}
     * @memberof Form
     */
    validate (target = false) {
        let submit = true;
        this.reload();
        for(let input of this.inputs) {
            let required = true;
            let valid = true;
            if (target) {
                if (input.props.name === target) {
                    [ valid, required ] = input.validate();
                }
            }
            if (!target) {
                [ valid, required ] = input.validate();
            }
            if (!valid && required) {
                submit = false;
            }
        }
        this.changeValidState(submit);
        if (!target) {
            if (submit) {
                this.execute('valid',{
                    ...((!target) ? { form: this } : { form: this, target: target }),
                    ...this.callbacks.valid.params,
                });
                if (this.state.submit) {
                    this.execute('submit', {
                        ...((!target) ? { form: this } : { form: this, target: target }),
                        ...this.callbacks.submit.params,
                    });
                    this.html.submit();
                }
            }
            if (!submit) {
                this.execute('invalid',{
                    ...((!target) ? { form: this } : { form: this, target: target }),
                    ...this.callbacks.invalid.params,
                });
            }
            return submit;
        }
    }

    /** 
     * * Default invalid callback function.
     * @static
     * @var {object} params Invalid callback function params.
     */
    static defaultInvalid (params = {}) {
        for (const target in params.errors) {
            if (Object.hasOwnProperty.call(params.errors, target)) {
                const errors = params.errors[target];
                if (!document.querySelector(`.support-${ target }`)) {
                    for (const error of errors) {
                        console.error(`${ target }: ${ error }`);
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
        submit: true,
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
            function: Form.defaultInvalid,
            params: {}
    }};
};