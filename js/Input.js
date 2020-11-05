// * ValidationJS repository.
import { Support } from "./Support.js";
import { Validation } from "./Validation.js";

/**
 * * Input controls the <input> created.
 * @export
 * @class Input
 */
export class Input{
    /**
     * * Creates an instance of Input.
     * @param {Object} properties Input properties.
     * @param {String} properties.id Input ID.
     * @param {HTMLElement} html Input HTML Element.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    constructor(properties = {
        id: 'validation-1',
    }, html = undefined, Form = undefined){
        this.setHTML(html, Form);
        this.setProperties(properties);
        this.setSupport();
        this.setEvent(Form);
    }

    /**
     * * Set the Input properties.
     * @param {Object} properties Input properties.
     * @param {String} properties.id Input ID.
     * @memberof Input
     */
    setProperties(properties = {
        id: 'validation-1',
    }){
        this.properties = {};
        this.setId(properties);
        this.setType();
        this.setName();
    }

    /**
     * * Returns the Input properties.
     * @returns {Object} The Input properties.
     * @memberof Input
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Input ID.
     * @param {Object} properties Input properties.
     * @param {String} properties.id Input ID.
     * @memberof Input
     */
    setId(properties = {
        id: 'validation-1'
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'validation-1';
        }
    }

    /**
     * * Returns the Input ID.
     * @returns {String} The Input ID.
     * @memberof Input
     */
    getId(){
        return this.properties.id;
    }

    /**
     * * Set the Input type.
     * @memberof Input
     */
    setType(){
        switch(this.getHTMLs()[0].nodeName){
            case 'INPUT':
                this.properties.type = this.getHTMLs()[0].type;
                break;
            case 'TEXTAREA':
                this.properties.type = 'text';
                break;
            case 'SELECT':
                this.properties.type = 'select';
                break;
        }
    }

    /**
     * * Returns the Input type.
     * @returns {String} The Input type.
     * @memberof Input
     */
    getType(){
        return this.properties.type;
    }

    /**
     * * Set the Input name.
     * @memberof Input
     */
    setName(){
        let name = this.getHTMLs()[0].name;
        if( /\[/.exec(this.getHTMLs()[0].name)){
            name = this.getHTMLs()[0].name.split('[').shift();
        }
        this.properties.name = name;
    }

    /**
     * * Returns the Input name.
     * @returns {String} The Input name.
     * @memberof Input
     */
    getName(){
        return this.properties.name;
    }

    /**
     * * Set the Input HTML Element.
     * @param {HTMLElement} html Input HTML Element.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setHTML(html = undefined, Form = undefined){
        this.htmls = [];
        this.htmls.push(html);
        if(html.classList.contains('confirmation')){
            this.setConfirmationInput(Form, html.name);
        }
    }

    /**
     * * Returns the Input HTML Elements.
     * @returns {HTMLElement[]} The Input HTML Elements.
     * @memberof Input
     */
    getHTMLs(){
        return this.htmls;
    }

    /**
     * * Set the confirmation Input.
     * @param {Form} Form Parent Form.
     * @param {String} name Input name.
     * @memberof Input
     */
    setConfirmationInput(Form = undefined, name = undefined){
        if(!this.confirmation){
            this.confirmation = [];
        }
        let input = document.querySelector(`form#${Form.getId()} .form-input[name="${name}_confirmation"]`);
        this.confirmation.push(input);
        this.setConfirmationEvent(input, Form);
    }

    /**
     * * Returns the confirmation Input HTML Element.
     * @returns {HTMLElement[]} The confirmation Input HTML Element.
     * @memberof Input
     */
    getConfirmationInput(){
        return this.confirmation;
    }

    /**
     * * Set the Input Support.
     * @memberof Input
     */
    setSupport(){
        this.support = Support.getHTML(this);
    }

    /**
     * * Returns the Input Support.
     * @returns {Support} The Input Support.
     * @memberof Input
     */
    getSupport(){
        return this.support;
    }

    /**
     * * Check if there is an Input Support.
     * @returns {Boolean} The "Is an Input Support?" boolean.
     * @memberof Input
     */
    hasSupport(){
        if (this.hasOwnProperty('support')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Set the Input event.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setEvent(Form = undefined){
        let instance = this;
        switch (this.getType()) {
            case 'file':
                this.getHTMLs()[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'radio':
                // TODO
                console.error('In the To Do List.');
                break;
            case 'hidden':
                for (const btn of document.querySelectorAll(`.${this.getName()}-trigger`)) {
                    btn.addEventListener('click', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case 'date':
                this.getHTMLs()[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                this.getHTMLs()[0].addEventListener('keyup', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'checkbox':
                for (const html of this.getHTMLs()) {
                    html.addEventListener('change', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case null:
                this.getHTMLs()[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            default:
                if(this.getHTMLs()[0].nodeName == 'TEXTAREA'){
                    if(this.checkCKEditor()){
                        CKEDITOR.instances[this.getHTMLs()[0].name].on('change', function(){
                            CKEDITOR.instances[instance.getHTMLs()[0].name].updateElement();
                            Validation.validate(Form, instance);
                        });
                    }else{
                        this.getHTMLs()[0].addEventListener('keyup', function(e){
                            e.preventDefault();
                            Validation.validate(Form, instance);
                        });
                    }
                }else{
                    this.getHTMLs()[0].addEventListener('keyup', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
        }
    }

    /**
     * * Set the confirmation Input event.
     * @param {HTMLElement} input Confirmation Input.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setConfirmationEvent(input = undefined, Form = undefined){
        let instance = this;
        switch (input.type) {
            default:
                input.addEventListener('keyup', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
        }
    }

    /**
     * * Check if the Input has a CKEditor.
     * @returns
     * @memberof Input
     */
    checkCKEditor(){
        if(this.getHTMLs()[0].classList.contains('ckeditor')){
            return true;
        }else{
            return false;
        }
    }

    /**
     * * Add a new Input HTML Element to the html array.
     * @param {HTMLElement} newInput A new Input HTML Element.
     * @memberof Input
     */
    addInput(newInput = undefined){
        if (newInput) {
            this.htmls.push(newInput);
        } else {
            console.error('There is not a new Input.');
        }
    }

    // TODO
    isArray(){
        console.warn('In the To Do List.');
    }
    
    /**
     * * Get all the Form <input> HTML Element.
     * @static
     * @param {Form} Form Parent Form.
     * @returns {Input[]} All the Input HTML Elements.
     * @memberof Input
     */
    static getAll(Form = undefined){
        let auxHtml = document.querySelectorAll(`form#${Form.getId()} .form-input`),
            htmls = [],
            names = [];
        for (const html of auxHtml) {
            let name = html.name;
            if(/\[/.exec(name)){
                name = name.split('[').shift();
            }
            if(html.type != 'checkbox'){
                if(names.indexOf(name) == -1){
                    htmls.push(new this({id: Form.getId()}, html, Form));
                    names.push(name);
                }else{
                    htmls[names.indexOf(name)].addInput(html);
                }
            }else{
                if(!htmls.length){
                    htmls.push(new this({id: Form.getId()}, html, Form));
                }else{
                    let push = true;
                    for (const htmlPushed of htmls) {
                        if(htmlPushed.getType() == 'checkbox'){
                            if(htmlPushed.getName() == name){
                                push = false;
                                htmlPushed.addInput(html);
                            }
                        }
                    }
                    if(push){
                        htmls.push(new this({id: Form.getId()}, html, Form));
                    }
                }
            }
        }
        return htmls;
    }

    /**
     * * Find if the Input exist in an auxiliar array.
     * @param {HTMLElement[]} inputs The auxiliar array.
     * @param {String} name Input name.
     * @param {String} className Parent Form class name.
     * @returns {Boolean} The "An Input exist in an auxiliar array?" boolean.
     */
    static exist(inputs, name, className){
        let found = false;
        for(let input of inputs){
            if(input.HTML == document.querySelector(className + " [name='" + name + "']")){
                found = true;
            }
        }
        return !found;
    }
};