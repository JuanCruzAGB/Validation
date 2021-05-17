// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Form from "./Form.js";
import Input from "./Input.js";
import Message from "./Message.js";
import Requirement from "./Requirement.js";
import Rule from "./Rule.js";
import Support from "./Support.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'validation-1',
    rules: [],
    messages: [],
};

/** @var {object} defaultState Default state. */
const defaultState = {
    submit: true,
    ignore: [],
};

/** @var {object} defaultCallbacks Default callbacks. */
const defaultCallbacks = {
    submit: {
        function: function (params) { /* console.log(params) */ },
        params: {}
}, valid: {
        function: function (params) { /* console.log('Everything is ok :D') */ },
        params: {}
}, invalid: {
        function: function (params) { for (const target in params.errors) {
            if (Object.hasOwnProperty.call(params.errors, target)) {
                const errors = params.errors[target];
                for (const error of errors) {
                    console.error(`${ target }: ${ error }`);
                }
            }
        } },
        params: {}
}};

/**
 * * Validation makes an excellent Front-end validation.
 * @export
 * @class Validation
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Validation extends Class {
    /**
     * * Creates an instance of Validation.
     * @param {object} [props] Validation properties:
     * @param {string} [props.id='validation-id'] Validation primary key.
     * @param {array} [props.rules] Validation Rules.
     * @param {array} [props.messages] Validation Messages.
     * @param {object} [state] Validation state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {array} [state.ignore] Ignore some rules.
     * @param {object} [callbacks] Validation callbacks:
     * @param {object} [callbacks.submit] Validation submit callback:
     * @param {function} [callbacks.submit.function] Validation submit function callback.
     * @param {object} [callbacks.submit.params] Validation submit params.
     * @param {object} [callbacks.valid] Validation valid callback:
     * @param {function} [callbacks.valid.function] Validation valid function callback.
     * @param {object} [callbacks.valid.params] Validation valid params.
     * @param {object} [callbacks.invalid] Validation invalid callback:
     * @param {function} [callbacks.invalid.function] Validation invalid function callback.
     * @param {object} [callbacks.invalid.params] Validation invalid params.
     * @memberof Validation
     */
    constructor (props = {
        id: 'validation-1',
        rules: [],
        messages: [],
    }, state = {
        submit: true,
        ignore: [],
    }, callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }, valid: {
            function: function (params) { /* console.log('Everything is ok :D') */ },
            params: {}
    }, invalid: {
            function: function (params) { for (const target in params.errors) {
                if (Object.hasOwnProperty.call(params.errors, target)) {
                    const errors = params.errors[target];
                    for (const error of errors) {
                        console.error(`${ target }: ${ error }`);
                    }
                }
            } },
            params: {}
    }}) {
        super({ ...deafultProps, ...props }, { ...defaultState, ...state });
        this.setCallbacks({ ...defaultCallbacks, ...callbacks });
        Rule.ignore(this.props.rules, this.state.ignore);
        this.setForm();
    }

    /**
     * * Set the Validation HTML Element.
     * @memberof Validation
     */
    setForm () {
        this.form = new Form(this.props, {
            submit: this.state.submit,
        }, this.callbacks);
    }

    /**
     * * Invelid an Input.
     * @param {Form} form
     * @param {Input} inputs
     * @param {string} message The error message.
     */
    static invalid (form, input = undefined, message = '') {
        form.addInvalidErrors(input.props.name, message);
        for (const html of input.htmls) {
            html.classList.remove('valid');
            html.classList.add('invalid');
        }
        if (input.support) {
            input.support.addError(message);
        }
        form.execute('invalid', {
            ...form.callbacks.invalid.params,
            errors: form.errors,
        });
    }

    /**
     * * Valid an Input.
     * @param {Form} form
     * @param {Input} inputs
     */
    static valid (form, input = undefined) {
        form.removeInvalidErrors(input.props.name);
        for (const html of input.htmls) {
            html.classList.remove('invalid');
            html.classList.add('valid');
        }
        if (input.support) {
            input.support.removeError();
        }
        form.execute('valid',{
            ...form.callbacks.valid.params,
        });
    }

    /**
     * * Validate a Form or an Input.
     * @static
     * @param {Form} form Form to validate.
     * @param {Input} [input=null] Input to validate.
     * @memberof Validation
     */
    static validate (form, input = null) {
        let valid = true;
        for(let rule of form.props.rules) {
            let status = {
                required: true,
                valid: true,
            }
            if (input === null) {
                status = Validation.validateForm(form, rule, status);
            }else{
                status = Validation.validateInput(form, input, rule, status);
            }
            if (!status.valid) {
                valid = false;
            }
        }
        form.changeValidaState(valid);
        if (valid && input === null && form.state.submit) {
            form.execute('submit', {
                ...form.callbacks.submit.params,
            })
            form.html.submit();
        }
    }

    /**
     * * Validate a Form.
     * @static
     * @param {Form} form Form to validate.
     * @param {Rule} rule Rule to check.
     * @param {object} status Validation status:
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Validation
     */
    static validateForm (form, rule, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        for (const requirement of rule.requirements) {
            if (status.valid && status.required) {
                status = requirement.execute(form.getInputByName(rule.props.target), status);
                if (status.valid) {
                    Validation.valid(form, form.getInputByName(rule.props.target));
                } else {
                    for (let message of form.props.messages) {
                        for (let error of status.errors) {
                            if (message.props.target == error.target) {
                                Validation.invalid(form, form.getInputByName(message.props.target), message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return status;
    }

    /**
     * * Validate an Input.
     * @static
     * @param {Form} form Form to validate.
     * @param {Input} input Input to validate.
     * @param {Rule} rule Rule to check.
     * @param {object} status Validation status:
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Validation
     */
    static validateInput (form, input, rule, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let requirements = rule.getRequirementsFromInput(input);
        let messages = form.getMessagesFromInput(input);
        for (const requirement of requirements) {
            if (status.valid && status.required) {
                status = requirement.execute(input, status);
                if (status.valid) {
                    Validation.valid(form, input);
                } else {
                    for (let message of messages) {
                        for (let error of status.errors) {
                            if (message.props.target == error.target) {
                                Validation.invalid(form, input, message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return status;
    }
};

// ? Validation childs
Validation.Form = Form;
Validation.Input = Input;
Validation.Input = Input;
Validation.Message = Message;
Validation.Requirement = Requirement;
Validation.Rule = Rule;
Validation.Support = Support;

// ? Default export
export default Validation;