/**
 * * Requirement controls the Rule requirements.
 * @export
 * @class Requirement
 */
export class Requirement{
    /**
     * * Creates an instance of Requirement.
     * @param {Object} properties Requirement properties.
     * @param {Object} properties.name Requirement name.
     * @memberof Requirement
     */
    constructor(properties = {
        name: undefined,
    }){
        this.setProperties(properties);
    }

    /**
     * * Set the Requirement properties.
     * @param {Object} properties Requirement properties.
     * @param {Object} properties.name Requirement name.
     * @memberof Requirement
     */
    setProperties(properties = {
        name: undefined,
    }){
        this.properties = {};
        let regexp = new RegExp(':')
        if(regexp.exec(properties.name)){
            let aux = properties.name.split(':');
            properties.name = aux[0];
            properties.param = aux[1];
        }
        this.setName(properties);
        this.setParam(properties);
    }

    /**
     * * Returns the Requirement properties.
     * @returns {Object} The Requirement properties.
     * @memberof Requirement
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Requirement name.
     * @param {Object} properties Requirement properties.
     * @param {Object} properties.name Requirement name.
     * @memberof Requirement
     */
    setName(properties = {
        name: undefined
    }){
        if (properties.hasOwnProperty('name')) {
            this.properties.name = properties.name;
        } else {
            this.properties.name = undefined;
        }
    }

    /**
     * * Returns the Requirement name.
     * @returns {String} The Requirement name.
     * @memberof Requirement
     */
    getName(){
        return this.properties.name;
    }

    /**
     * * Set the Requirement param.
     * @param {Object} properties Requirement properties.
     * @param {Object} properties.param Requirement param.
     * @memberof Requirement
     */
    setParam(properties = {
        param: undefined
    }){
        if (properties.hasOwnProperty('param')) {
            this.properties.param = properties.param;
        } else {
            this.properties.param = undefined;
        }
    }

    /**
     * * Returns the Requirement param.
     * @returns {String} The Requirement param.
     * @memberof Requirement
     */
    getParam(){
        return this.properties.param;
    }

    /**
     * * Check if there is a Requirement param.
     * @returns {Boolean} The "If there is a Requirement param" boolean.
     * @memberof Requirement
     */
    hasParam(){
        if (this.properties.hasOwnProperty('param') && this.properties.param) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Execute the Requirement.
     * @param {Input} input Input to validate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object} The status.
     * @memberof Requirement
     */
    execute(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        if(this.hasParam()){
            status = Requirement[this.getName()](input, status, this.getParam());
        }else{
            status = Requirement[this.getName()](input, status);
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static required(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(input.getType() == 'select'){
                if(!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value){
                    valid = true;
                }
            }else if(input.getType() == 'checkbox'){
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static nullable(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let required = true;
        for (const html of input.getHTMLs()) {
            if(input.getType() == 'select'){
                if(html.options[html.selectedIndex].disabled || !html.options[html.selectedIndex].value){
                    required = false;
                }
            }else if(input.getType() == 'checkbox'){
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
     * @returns {Object} The status.
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
     * @returns {Object} The status.
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static email(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let regexp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(regexp.exec(html.value)){
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
     * @returns {Object} The status.
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static array(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            if(input.isArray()){
                valid = true;
            }
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static url(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        let regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        for (const html of input.getHTMLs()) {
            if(regexp.exec(html.value)){
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
     * @returns
     * @returns {Object} The status. {Object} The status.
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
     * @returns {Object} The status.
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
     * @returns {Object} The status.
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
     * * Check if an Input value exist or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @param {*} param Requirement param.
     * @returns {Object} The status.
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
     * @returns {Object} The status.
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
     * @returns {Object} The status.
     * @memberof Requirement
     */
    static confirmed(input = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        let valid = false;
        for (const html of input.getHTMLs()) {
            let input_confirmation = document.querySelector(`[name=${input.getName()}_confirmation]`);
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
     * @param {object} requirement - Requirement.
     * @param {Input} input - Input to validate.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object} The status.
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
            target: input.getName(),
            requirement: requirement,
        });
        return status;
    }
};