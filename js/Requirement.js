// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'req-1',
    name: 'required',
    param: false,
};

/** @var {object} defaultState Default state. */
const defaultState = {
    //
};

/**
 * * Requirement controls the Rule requirements.
 * @export
 * @class Requirement
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Requirement extends Class {
    /**
     * * Creates an instance of Requirement.
     * @param {object} [props] Requirement properties:
     * @param {string} [props.id='requirement-1'] Requirement pimary key.
     * @param {object} [props.name='required'] Requirement name.
     * @param {object} [props.param=false] Requirement param.
     * @param {object} [state] Requirement state:
     * @memberof Requirement
     */
    constructor (props = {
        id: 'requirement-1',
        name: 'required',
        param: false,
    }, state = {}) {
        if (/:/.exec(props.name)) {
            let aux = props.name.split(':');
            props.name = aux[0];
            props.param = aux[1];
        }
        super({ ...deafultProps, ...props }, { ...defaultState, ...state });
    }

    /**
     * * Execute the Requirement.
     * @param {Input} input Input to validate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    execute (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        if (this.hasProp('param')) {
            status = Requirement[this.props.name](input, status, this.props.param);
        } else {
            status = Requirement[this.props.name](input, status);
        }
        return status;
    }

    /**
     * * Make an Input required.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static required (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (input.props.type == 'select') {
                if (!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value) {
                    valid = true;
                }
            } else if (input.props.type == 'checkbox') {
                if (html.checked) {
                    valid = true;
                }
            } else {
                if (html.value) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'required',
            }, input, status);
        }
        status.required = true;
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input nullable.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static nullable (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let required = true;
        for (const html of input.htmls) {
            if (input.props.type == 'select') {
                if (html.options[html.selectedIndex].disabled || !html.options[html.selectedIndex].value) {
                    required = false;
                }
            } else if (input.props.type == 'checkbox') {
                if (!html.checked) {
                    required = false;
                } else {
                    required = true;
                }
            } else {
                if (!html.value) {
                    required = false;
                }
            }
        }
        status.required = required;
        status.valid = true;
        return status;
    }

    /**
     * * Make an Input numeric.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static numeric (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (!isNaN(html.value)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'numeric',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input string.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static string (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (typeof html.value == 'string') {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'string',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input email.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static email (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.exec(html.value)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'email',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input date.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static date (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (Date.parse(html.value)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'date',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input an array.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static array (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        if (input.isArray()) {
            valid = true;
        }
        if (!valid) {
            status = this.setError({
                name: 'array',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Make an Input an url.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static url (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.exec(html.value)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'url',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Put a min length on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static min (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        let valid = false;
        for (const html of input.htmls) {
            if (html.value.length >= parseInt(param)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'min',
                param: param,
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Put a max length on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static max (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        let valid = false;
        for (const html of input.htmls) {
            if (html.value.length <= parseInt(param)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'max',
                param: param,
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Put mimetypes on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static mimetypes (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        let valid = false;
        let params = param.split(',');
        for (const html of input.htmls) {
            if (html.files && html.files.length) {
                let found = false;
                for(let file of html.files) {
                    for(let param of params) {
                        if (file.type == param) {
                            found = true;
                        }
                    }
                }
                if (found) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'mimetypes',
                param: param,
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Check if an Input value match with a RegExp.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static regex (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        let valid = false;
        if (param[0] == '/') {
            param = param.replace(/^\//, '');
            param = param.replace(/\/g$/, '');
            param = param.replace(/\/i$/, '');
            param = param.replace(/\/gi$/, '');
            param = param.replace(/\/ig$/, '');
            param = param.replace(/\/$/, '');
        }
        for (const html of input.htmls) {
            let regex = new RegExp(param);
            if (regex.exec(html.value)) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'regex',
                param: param,
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Check if an Input value exist or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static exists (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        // TODO Get data from api with FetchServiceProvider.
        console.warn('TODO Check if something exists');
        return status;
    }

    /**
     * * Check if an Input value is unique or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static unique (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined) {
        // TODO Get data from api with FetchServiceProvider.
        console.warn('TODO Check if something is unique');
        return status;
    }

    /**
     * * Check if an Input match with its confirmed Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static confirmed (input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let valid = false;
        for (const html of input.htmls) {
            let input_confirmation = document.querySelector(`[name=${ input.props.name }_confirmation]`);
            if (html.value == input_confirmation.value) {
                valid = true;
            }
        }
        if (!valid) {
            status = this.setError({
                name: 'confirmed',
            }, input, status);
        }
        status.valid = valid;
        return status;
    }

    /**
     * * Create the error.
     * @static
     * @param {object} requirement Requirement.
     * @param {Input} input Input to validate.
     * @param {object} status Validation status.
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Requirement
     */
    static setError (requirement = undefined, input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        if (!status.errors) {
            status.errors = [];
        }
        status.errors.push({
            target: input.props.name,
            requirement: requirement,
        });
        return status;
    }
};

// ? Default export
export default Requirement;