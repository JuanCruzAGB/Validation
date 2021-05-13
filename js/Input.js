// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository.
import Support from "./Support.js";
import Validation from "./Validation.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'input-1',
    type: 'text',
    name: 'input',
};

/** @var {object} defaultState Default state. */
const defaultState = {
    //
};

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
     * @param {object} [state] Input state:
     * @param {HTMLElement} [html] Input HTML Element.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    constructor (props = {
        id: 'input-1',
        type: 'text',
        name: 'input',
    }, state = {}, html = undefined, Form) {
        super({ ...deafultProps, ...props }, { ...defaultState, ...state })
        this.setHTMLs(html, Form);
        this.setSupport();
        this.setEvent(Form);
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
        this.htmls.push(html);
        if (html.classList.contains('confirmation')) {
            this.setConfirmationInput(Form, html.name);
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
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setEvent (Form) {
        let instance = this;
        switch (this.props.type) {
            case 'file':
                for (const html of this.htmls) {
                    html.addEventListener('change', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case 'radio':
                // TODO
                console.warn('TODO Apply event to the <input type="radio"/>');
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
                for (const html of this.htmls) {
                    html.addEventListener('change', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                    html.addEventListener('focusout', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case 'checkbox':
                for (const html of this.htmls) {
                    html.addEventListener('change', function (e) {
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case null:
                this.htmls[0].addEventListener('change', function (e) {
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            default:
                for (const html of this.htmls) {
                    if (html.nodeName == 'TEXTAREA') {
                        if (html.classList.contains('ckeditor')) {
                            let input = html;
                            CKEDITOR.instances[html.name].on('change', function (e) {
                                CKEDITOR.instances[input.name].updateElement();
                                Validation.validate(Form, instance);
                            });
                        } else {
                            html.addEventListener('focusout', function (e) {
                                e.preventDefault();
                                Validation.validate(Form, instance);
                            });
                        }
                    } else {
                        html.addEventListener('focusout', function (e) {
                            e.preventDefault();
                            Validation.validate(Form, instance);
                        });
                    }
                }
                break;
        }
    }

    /**
     * * Add a new Input HTML Element to the html array.
     * @param {HTMLElement} newInput A new Input HTML Element.
     * @memberof Input
     */
    addInput (newInput) {
        this.htmls.push(newInput);
    }
    
    /**
     * * Get all the Form <input> HTML Element.
     * @static
     * @param {Form} Form Parent Form.
     * @returns {Input[]}
     * @memberof Input
     */
    static getAllDomHTML (Form) {
        let auxHtml = document.querySelectorAll(`form#${ Form.props.id } .form-input`), htmls = [], names = [];
        for (const html of auxHtml) {
            let name = html.name;
            let type = '';
            if (/\[/.exec(name)) {
                name = name.split('[').shift();
            }
            switch (html.nodeName) {
                case 'INPUT':
                    type = html.type;
                    break;
                case 'TEXTAREA':
                    type = 'text';
                    break;
                case 'SELECT':
                    type = 'select';
                    break;
            }
            if (html.type != 'checkbox') {
                if (names.indexOf(name) == -1) {
                    htmls.push(new this({
                        id: `${ Form.props.id }-${ name }`,
                        name: name,
                        type: type,
                    }, {}, html, Form));
                    names.push(name);
                } else {
                    htmls[names.indexOf(name)].addInput(html);
                }
            } else {
                if (!htmls.length) {
                    htmls.push(new this({
                        id: `${ Form.props.id }-${ name }`,
                        // name: name,
                        // type: type,
                    }, {}, html, Form));
                } else {
                    let push = true;
                    for (const htmlPushed of htmls) {
                        if (htmlPushed.props.type === 'checkbox') {
                            if (htmlPushed.props.name === name) {
                                push = false;
                                htmlPushed.addInput(html);
                            }
                        }
                    }
                    if (push) {
                        htmls.push(new this({
                            id: `${ Form.props.id }-${ name }`,
                            name: name,
                            type: type,
                        }, {}, html, Form));
                    }
                }
            }
        }
        return htmls;
    }
};

// ? Deafult export
export default Input;