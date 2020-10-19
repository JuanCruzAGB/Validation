/**
 * * Requirement controls the Rule requirements.
 * @export
 * @class Requirement
 */
export class Requirement{
    /**
     * * Creates an instance of Requirement.
     * @param {object} properties - Requirement properties.
     * @memberof Requirement
     */
    constructor(properties = {
        name: undefined,
    }){
        this.setProperties(properties);
    }

    /**
     * * Set the Requirement properties.
     * @param {object} properties - Requirement properties.
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
     * * Set the Requirement name.
     * @param {object} properties - Requirement properties.
     * @memberof Requirement
     */
    setName(properties = {
        name: undefined
    }){
        this.properties.name = properties.name;
    }

    /**
     * * Set the Requirement param.
     * @param {object} properties - Requirement properties.
     * @memberof Requirement
     */
    setParam(properties = {
        param: undefined
    }){
        this.properties.param = properties.param;
    }

    /**
     * * Execute the Requirement.
     * @param {Input} input - Input to validate.
     * @memberof Requirement
     */
    execute(input = undefined, status = {
        required: true,
        valid: true,
    }){
        if(this.properties.param){
            status = Requirement[this.properties.name](input, status, this.properties.param);
        }else{
            status = Requirement[this.properties.name](input, status);
        }
        return status;
    }

    /**
     * * Make an Input required.
     * @static
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static required(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
            if(input.properties.type == 'select'){
                if(!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value){
                    valid = true;
                }
            }else if(input.properties.type == 'checkbox'){
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static nullable(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let required = true;
        for (const html of input.htmls) {
            if(input.properties.type == 'select'){
                if(html.options[html.selectedIndex].disabled || !html.options[html.selectedIndex].value){
                    required = false;
                }
            }else if(input.properties.type == 'checkbox'){
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static numeric(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static string(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static email(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let regexp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static date(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static array(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
            if(input.array){
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static url(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        let regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @param {*} param - Requirement param.
     * @returns
     * @memberof Requirement
     */
    static min(input = undefined, status = {
        required: true,
        valid: true,
    }, param = undefined){
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @param {*} param - Requirement param.
     * @returns
     * @memberof Requirement
     */
    static max(input = undefined, status = {
        required: true,
        valid: true,
    }, param = undefined){
        let valid = false;
        for (const html of input.htmls) {
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
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @param {*} param - Requirement param.
     * @returns
     * @memberof Requirement
     */
    static mimetypes(input = undefined, status = {
        required: true,
        valid: true,
    }, param = undefined){
        let valid = false;
        let params = param.split(',');
        for (const html of input.htmls) {
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

    static exists(input = undefined, status = {
        required: true,
        valid: true,
    }, param = undefined){
        // TODO Get data from api with FetchServiceProvider.
        // console.log(input);
        // console.log(param);
        return status;
    }

    static unique(input = undefined, status = {
        required: true,
        valid: true,
    }, param = undefined){
        // TODO Get data from api with FetchServiceProvider.
        // console.log(input);
        // console.log(param);
        return status;
    }

    /**
     * * Make a confirm Input.
     * @static
     * @param {Input} input - Input to valdiate.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static confirmed(input = undefined, status = {
        required: true,
        valid: true,
    }){
        let valid = false;
        for (const html of input.htmls) {
            let input_confirmation = document.querySelector(`[name=${input.properties.name}_confirmation]`);
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
     * @param {object} status - Validation status.
     * @returns
     * @memberof Requirement
     */
    static setError(requirement = undefined, input = undefined, status = {
        required: true,
        valid: true,
    }){
        if(!status.errors){
            status.errors = [];
        }
        status.errors.push({
            target: input.properties.name,
            requirement: requirement,
        });
        return status;
    }
};