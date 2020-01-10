let Requirements = {
    /** @var {object} - Make an input required. */
    required: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @return {object}
         */
        validate(input){
            if(input.value){
                return aux = {
                    required: true,
                    valid: true,
                };
            }else{
                return aux = {
                    required: true,
                    valid: false,
                };
            }
        },
    }, 
    /** @var {object} - Make an input nullable. */
    nullable: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @return {object}
         */
        validate(input){
            if(!input.value){
                return aux = {
                    required: false,
                    valid: true,
                };
            }else{
                return aux = {
                    required: true,
                    valid: true,
                };
            }
        }
    },
    /** @var {object} - Make an input numeric. */
    numeric: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @return {object}
         */
        validate(input, aux){
            if(!isNaN(input.value)){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        }
    }, 
    /** @var {object} - Make an input an email. */
    email: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @return {object}
         */
        validate(input, aux){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(input.value)){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        }
    },
    /** @var {object} - Make an input a date. */
    date: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @return {object}
         */
        validate(input, aux){
            if(Date.parse(input.value)){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        },
    },
    /** @var {object} - Make an input an url. */
    url: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @return {object}
         */
        validate(input, aux){
            if(input.value.search(/https:\/\//) == 0 && input.value.search(/\./) >= 0){
                aux.valid = true;
                return aux;
            }else if(input.value.search(/http:\/\//) == 0 && input.value.search(/\./) >= 0){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        },
    },
    /** @var {object} - Put a min length on an input. */
    min: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @param {number} length - The length.
         * @return {object}
         */
        validate(input, aux, length){
            if(input.value.length >= parseInt(length)){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        },
        /** @var {object} - The Requirement min replacement text */
        replacement: [
            ":min",
        ],
    },
    /** @var {object} - Put a max length on an input. */
    max: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @param {number} length - The length.
         * @return {object}
         */
        validate(input, aux, length){
            if(input.value.length <= parseInt(length)){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        },
        /** @var {object} - The Requirement max replacement text */
        replacement: [
            ":max",
        ],
    }, 
    /** @var {object} - Put mimetypes on an input. */
    mimetypes: {
        /**
         * Valid an input.
         * @param {html} input - The input.
         * @param {object} aux - An auxiliar.
         * @return {object}
         */
        validate(input, aux){
            if(input.files && input.files.length){
                let found = false;
                for(let position = 0; position < input.files.length; position++){
                    for(let i = 0; i < aux.rules.mimetypes.length; i++){
                        if(input.files[position].type == aux.rules.mimetypes[i]){
                            found = true;
                        }
                    }
                }
                if(found){
                    aux.valid = true;
                    return aux;
                }else{
                    aux.valid = false;
                    return aux;
                }
            }else{
                aux.valid = false;
                return aux;
            }
        },
        /** @var {object} - The Requirement mimetypes params. */
        params: [
            'image/jpeg',
            'image/png',
        ],
        /** @var {object} - The Requirement mimetypes replacement text */
        replacement: [
            ":mimetypes",
        ],
    },
    captcha: {
        validate(input){
            console.log(input.value)
            if(grecaptcha.getResponse()){
                aux.valid = true;
                return aux;
            }else{
                aux.valid = false;
                return aux;
            }
        },
    },
    // exists: {
    //     /**
    //      * Valid an input.
    //      * @param {html} input - The input.
    //      * @param {object} aux - An auxiliar.
    //      * @param {number} length - The length.
    //      * @return {object}
    //      */
    //     validate(input, aux, params){
    //         console.log(params);
    //     },
    //     /** @var {object} - The Requirement exists replacement text */
    //     replacement: [
    //         ":table",
    //         ":column",
    //     ],
    // },
    // unique: {
    //     /**
    //      * Valid an input.
    //      * @param {html} input - The input.
    //      * @param {object} aux - An auxiliar.
    //      * @param {number} length - The length.
    //      * @return {object}
    //      */
    //     validate(input, aux, params){
    //         params
    //     },
    // },
};