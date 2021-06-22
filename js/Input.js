// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository.
import Support from "./Support.js";
import Validation from "./Validation.js";

/**
 * * Input controls the <input> created.
 * @export
 * @class Input
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Input extends Class {
    /**
     * * Creates an instance of Input.
     * @param {object} [props] Input properties:
     * @param {string} [props.id='input-1'] Input primary key.
     * @param {string} [props.type='text'] Input type.
     * @param {string} [props.name='input'] Input name.
     * @param {HTMLElement} [html] Input HTML Element.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    constructor (props = {
        id: 'input-1',
        type: 'text',
        name: 'input',
    }, html = undefined, Form) {
        super({ ...Input.props, ...props });
        this.setHTMLs(html, Form);
        this.setSupport();
    }

    /**
     * * Set the Input HTML Element.
     * @param {HTMLElement} [html] Input HTML Element.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    setHTMLs (html = undefined, Form) {
        if (!this.htmls) {
            this.htmls = [];
        }
        if (html) {
            this.htmls.push(html);
            if (html.classList.contains('confirmation')) {
                this.setConfirmationInput(Form, html.name);
            }
            this.setEvent(html, Form);
        }
    }

    /**
     * * Set the confirmation Input.
     * @param {Form} Form Parent Form.
     * @param {string} name Input name.
     * @memberof Input
     */
    setConfirmationInput (Form, name = undefined) {
        if (!this.confirmation) {
            this.confirmation = [];
        }
        let input = document.querySelector(`form#${ Form.props.id } .form-input[name="${ name }_confirmation"]`);
        this.confirmation.push(input);
        input.addEventListener('focusout', function (e) {
            e.preventDefault();
            Validation.validate(Form, instance);
        });
    }

    /**
     * * Set the Input Support.
     * @memberof Input
     */
    setSupport () {
        this.support = Support.getDomHTML(this);
    }

    /**
     * * Set the Input event.
     * @param {HTMLElement} html Input HTML Element.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setEvent (html, Form) {
        let instance = this;
        switch (this.props.type) {
            case 'file':
                html.addEventListener('change', function (e) {
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'hidden':
                for (const btn of document.querySelectorAll(`.${ this.props.name }-trigger`)) {
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case 'date':
                html.addEventListener('change', function (e) {
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                html.addEventListener('focusout', function (e) {
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'checkbox':
            case 'radio':
            case 'select':
                html.addEventListener('change', function (e) {
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'password':
            case 'text':
            case 'url':
                if (html.nodeName === 'TEXTAREA') {
                    if (html.classList.contains('ckeditor')) {
                        let input = html;
                        CKEDITOR.instances[html.name].on('change', function (e) {
                            CKEDITOR.instances[input.name].updateElement();
                            Validation.validate(Form, instance);
                        });
                    }
                    if (!html.classList.contains('ckeditor')) {
                        html.addEventListener('focusout', function (e) {
                            e.preventDefault();
                            Validation.validate(Form, instance);
                        });
                    }
                }
                if (html.nodeName !== 'TEXTAREA') {
                    html.addEventListener('focusout', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            default:
                console.error(`Input type: ${ this.props.type } does not have event`);
                break;
        }
    }
    
    /**
     * * Get all the Form <input> HTML Element.
     * @static
     * @param {Form} Form Parent Form.
     * @returns {Input[]}
     * @memberof Input
     */
    static getAllDomHTML (Form) {
        let auxHtml = document.querySelectorAll(`form#${ Form.props.id } .form-input`), inputs = [], names = [], input;
        for (const rule of Form.props.rules) {
            input = new this({
                id: `${ Form.props.id }-${ rule.props.target }`,
                name: rule.props.target,
            }, undefined, Form);
            for (const html of auxHtml) {
                let name = html.name;
                if (/\[/.exec(name)) {
                    name = name.split('[').shift();
                }
                if (name === rule.props.target) {
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
                    input.setHTMLs(html, Form);
                }
            }
            inputs.push(input);
        }
        return inputs;
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
    static validate (form, input, rule, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let reqs = rule.getReqsFromInput(input);
        let messages = form.getMessagesFromInput(input);
        let array = false;
        for (const req of reqs) {
            if (req.props.name === 'array') {
                array = true;
            }
        }
        for (const req of reqs) {
            if (status.valid && status.required) {
                status = req.execute(input, status, array);
                if (status.valid) {
                    Validation.valid(form, input);
                }
                if (!status.valid) {
                    for (let message of messages) {
                        for (let error of status.errors) {
                            if (message.props.target === error.target) {
                                Validation.invalid(form, input, message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return status;
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'input-1',
        type: 'text',
        name: 'input',
    }
};

// ? Deafult export
export default Input;