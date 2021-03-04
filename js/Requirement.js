// ? External repository
import { FetchServiceProvider as Fetch } from "../../ProvidersJS/FetchServiceProvider.js";

/**
 * * Requirement controls the Rule requirements.
 * @export
 * @class Requirement
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Requirement{
    /**
     * * Creates an instance of Requirement.
     * @param {Object} [properties] Requirement properties:
     * @param {String} [properties.id] Requirement ID.
     * @param {Object} [properties.name] Requirement name.
     * @param {Object} [properties.param] Requirement param.
     * @param {Object} [states] Requirement states:
     * @memberof Requirement
     */
    constructor(properties = {
        id: 'requirement-1',
        name: 'required',
        param: false,
    }, states = {}){
        this.setProperties(properties);
        this.setStates(states);
    }

    /**
     * * Set the Requirement properties.
     * @param {Object} [properties] Requirement properties:
     * @param {String} [properties.id] Requirement ID.
     * @param {String} [properties.name] Requirement name.
     * @param {Object} [properties.param] Requirement param.
     * @memberof Requirement
     */
    setProperties(properties = {
        id: 'requirement-1',
        name: 'required',
        param: false,
    }){
        this.properties = {};
        this.setIDProperty(properties);
        if(/:/.exec(properties.name)){
            let aux = properties.name.split(':');
            properties.name = aux[0];
            properties.param = aux[1];
        }
        this.setNameProperty(properties);
        this.setParamProperty(properties);
    }

    /**
     * * Returns the Requirement properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Requirement
     */
    getProperties(property = ''){
        if (property && property != '') {
            return this.properties[property];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} property Property name.
     * @returns {Boolean}
     * @memberof Requirement
     */
    hasProperty(property = ''){
        if (this.properties.hasOwnProperty(property)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} property Property name.
     * @param {*} value Property value.
     * @memberof Requirement
     */
    changeProperty(property = '', value = ''){
        if (this.hasProperty(property)) {
            this.properties[property] = value;
        }
        switch (property) {
            default:
                break;
        }
    }

    /**
     * * Set the Requirement ID.
     * @param {Object} [properties] Requirement properties:
     * @param {String} [properties.id] Requirement ID.
     * @memberof Requirement
     */
    setIDProperty(properties = {
        id: 'requirement-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'requirement-1';
        }
    }

    /**
     * * Returns the Requirement ID.
     * @returns {String}
     * @memberof Requirement
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Requirement name.
     * @param {Object} [properties] Requirement properties:
     * @param {String} [properties.name] Requirement name.
     * @memberof Requirement
     */
    setNameProperty(properties = {
        name: 'required',
    }){
        if (properties.hasOwnProperty('name')) {
            this.properties.name = properties.name;
        } else {
            this.properties.name = 'required';
        }
    }

    /**
     * * Returns the Requirement name.
     * @returns {String}
     * @memberof Requirement
     */
    getNameProperty(){
        return this.properties.name;
    }

    /**
     * * Set the Requirement param.
     * @param {Object} [properties] Requirement properties:
     * @param {Object} [properties.param] Requirement param.
     * @memberof Requirement
     */
    setParamProperty(properties = {
        param: false,
    }){
        if (properties.hasOwnProperty('param')) {
            this.properties.param = properties.param;
        } else {
            this.properties.param = false;
        }
    }

    /**
     * * Returns the Requirement param.
     * @returns {String}
     * @memberof Requirement
     */
    getParamProperty(){
        return this.properties.param;
    }

    /**
     * * Set the Requirement states.
     * @param {Object} [states] Requirement states:
     * @memberof Requirement
     */
    setStates(states = {}){
        this.states = {};
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Requirement
     */
    getStates(property = ''){
        if (property && property != '') {
            return this.states[property];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {String} name Status name.
     * @returns {Boolean}
     * @memberof Requirement
     */
    hasStates(name = ''){
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {String} status Status name.
     * @param {*} value Status value.
     * @memberof Requirement
     */
    changeStatus(status = '', value = ''){
        if (this.hasStates(status)) {
            this.states[status] = value;
        }
        switch (status) {
            default:
                break;
        }
    }

    /**
     * * Execute the Requirement.
     * @param {Input} input Input to validate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    execute(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        console.log(this.getProperties());
        if(this.hasProperty('param')){
            status = Requirement[this.getProperties('name')](input, status, this.getProperties('param'));
        }else{
            status = Requirement[this.getProperties('name')](input, status);
        }
        return status;
    }

    /**
     * * Make an Input required.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static required(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        console.log(input);
        for (const html of input.getHTMLs()) {
            if(input.getProperties('type') == 'select'){
                if(!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value){
                    valid = true;
                }
            }else if(input.getProperties('type') == 'checkbox'){
                if(html.checked){
                    valid = true;
                }
            }else{
                if(html.value){
                    valid = true;
                }
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static nullable(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let required = true;
        for (const html of input.getHTMLs()) {
            if(input.getProperties('type') == 'select'){
                if(html.options[html.selectedIndex].disabled || !html.options[html.selectedIndex].value){
                    required = false;
                }
            }else if(input.getProperties('type') == 'checkbox'){
                if(!html.checked){
                    required = false;
                }else{
                    required = true;
                }
            }else{
                if(!html.value){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static numeric(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(!isNaN(html.value)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static string(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(typeof html.value == 'string'){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static email(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.exec(html.value)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static date(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(Date.parse(html.value)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static array(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        if(input.isArray()){
            valid = true;
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static url(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.exec(html.value)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static min(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(html.value.length >= parseInt(param)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static max(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(html.value.length <= parseInt(param)){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static mimetypes(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        let valid = false;
        let params = param.split(',');
        for (const html of input.getHTMLs()) {
            if(html.files && html.files.length){
                let found = false;
                for(let file of html.files){
                    for(let param of params){
                        if(file.type == param){
                            found = true;
                        }
                    }
                }
                if(found){
                    valid = true;
                }
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static regex(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        let valid = false;
        if (param[0] == '/') {
            param = param.replace(/^\//, '');
            param = param.replace(/\/g$/, '');
            param = param.replace(/\/i$/, '');
            param = param.replace(/\/gi$/, '');
            param = param.replace(/\/ig$/, '');
            param = param.replace(/\/$/, '');
        }
        for (const html of input.getHTMLs()) {
            let regex = new RegExp(param);
            if (regex.exec(html.value)) {
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static exists(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        // TODO Get data from api with FetchServiceProvider.
        return status;
    }

    /**
     * * Check if an Input value is unique or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object}
     * @memberof Requirement
     */
    static unique(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }, param = undefined){
        // TODO Get data from api with FetchServiceProvider.
        return status;
    }

    /**
     * * Check if an Input match with its confirmed Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static confirmed(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            let input_confirmation = document.querySelector(`[name=${ input.getProperties('name') }_confirmation]`);
            if(html.value == input_confirmation.value){
                valid = true;
            }
        }
        if(!valid){
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
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object}
     * @memberof Requirement
     */
    static setError(requirement = undefined, input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        if(!status.errors){
            status.errors = [];
        }
        status.errors.push({
            target: input.getProperties('name'),
            requirement: requirement,
        });
        return status;
    }
};