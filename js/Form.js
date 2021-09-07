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
     * @param {boolean} [state.active=true] If the Validation has to be done.
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
        active: true,
    }, callbacks = {
        inactive: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, invalid: {
            function: Form.defaultInvalid,
            params: {}
        }, submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
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
        this.inputs = Input.generate(this);
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
        if (this.state.active) {
            let submit = true;
            let errors = [];
            this.reload();
            for(let input of this.inputs) {
                let required = true;
                let valid = true;
                let error = [];
                if (target) {
                    if (input.props.name === target) {
                        [ valid, required, error ] = input.validate();
                    }
                }
                if (!target) {
                    [ valid, required, error ] = input.validate();
                }
                if (!valid && required) {
                    errors.push(error);
                    submit = false;
                }
            }
            this.changeValidState(submit);
            if (!target) {
                if (submit) {
                    this.execute('valid',{
                        ...((!target) ? { Form: this } : { Form: this, target: target }),
                        ...this.callbacks.valid.params,
                    });
                    if (this.state.submit) {
                        this.execute('submit', {
                            ...((!target) ? { Form: this } : { Form: this, target: target }),
                            ...this.callbacks.submit.params,
                        });
                        this.html.submit();
                    }
                }
                if (!submit) {
                    this.execute('invalid',{
                        ...((!target) ? { Form: this } : { Form: this, target: target }),
                        errors: errors,
                        ...this.callbacks.invalid.params,
                    });
                }
                return submit;
            }
        }
        if (!this.state.active) {
            this.execute('inactive',{
                Form: this,
                ...this.callbacks.inactive.params,
            });
            return false;
        }
    }

    /** 
     * * Default invalid callback function.
     * @static
     * @var {object} params Invalid callback function params.
     */
    static defaultInvalid (params = {}) {
        for (const errors of params.errors) {
            for (const error of errors) {
                if (!error.Input.support) {
                    console.error(`Input [name=${ error.Input.props.name }]: ${ error.message }`);
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
        messages: [],
        rules: [],
    }
    
    /** 
     * @static
     * @var {object} state Default state.
     */
    static state = {
        active: true,
        ignore: [],
        submit: true,
        valid: false,
    }
    
    /** 
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        inactive: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, invalid: {
            function: Form.defaultInvalid,
            params: {}
        }, submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
    }};
};