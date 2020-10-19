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
     * @param {object} properties - Input properties.
     * @param {HTMLElement} html - Input HTML Element.
     * @param {Form} Form - Input Form.
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
     * @param {object} properties - Input properties.
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
     * * Set the Input ID.
     * @param {object} properties - Input properties.
     * @memberof Input
     */
    setId(properties = {
        id: 'validation-1'
    }){
        this.properties.id = properties.id;
    }

    /**
     * * Set the Input type.
     * @memberof Input
     */
    setType(){
        switch(this.htmls[0].nodeName){
            case 'INPUT':
                this.properties.type = this.htmls[0].type;
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
     * * Set the Input name.
     * @memberof Input
     */
    setName(){
        let name = this.htmls[0].name;
        if( /\[/.exec(this.htmls[0].name)){
            name = this.htmls[0].name.split('[').shift();
        }
        this.properties.name = name;
    }

    /**
     * * Set the Input HTML Element.
     * @param {HTMLElement} html - Input HTML Element.
     * @param {Form} Form - Form.
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
     * * Set the confirmation Input.
     * @param {Form} Form - Form.
     * @param {string} name - Input name.
     * @memberof Input
     */
    setConfirmationInput(Form = undefined, name = undefined){
        if(!this.confirmation){
            this.confirmation = [];
        }
        let input = document.querySelector(`form#${Form.properties.id} .form-input[name="${name}_confirmation"]`);
        this.confirmation.push(input);
        this.setConfirmationEvent(input, Form);
    }

    /**
     * * Set the Input Support.
     * @memberof Input
     */
    setSupport(){
        this.support = Support.getHTML(this.properties);
    }

    /**
     * * Set the Input event.
     * @param {Form} Form - Form.
     * @memberof Input
     */
    setEvent(Form = undefined){
        let instance = this;
        switch (this.properties.type) {
            case 'file':
                this.htmls[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'radio':
                // TODO
                break;
            case 'hidden':
                for (const btn of document.querySelectorAll(`.${this.properties.name}-trigger`)) {
                    btn.addEventListener('click', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case 'date':
                this.htmls[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                this.htmls[0].addEventListener('keyup', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'checkbox':
                for (const html of this.htmls) {
                    html.addEventListener('change', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
            case null:
                this.htmls[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            default:
                if(this.htmls[0].nodeName == 'TEXTAREA'){
                    if(this.checkCKEditor()){
                        CKEDITOR.instances[this.htmls[0].name].on('change', function(){
                            CKEDITOR.instances[instance.htmls[0].name].updateElement();
                            Validation.validate(Form, instance);
                        });
                    }else{
                        this.htmls[0].addEventListener('keyup', function(e){
                            e.preventDefault();
                            Validation.validate(Form, instance);
                        });
                    }
                }else{
                    this.htmls[0].addEventListener('keyup', function(e){
                        e.preventDefault();
                        Validation.validate(Form, instance);
                    });
                }
                break;
        }
    }

    /**
     * * Set the Input confirmation event.
     * @param {HTMLElement} input - Confirmation Input.
     * @param {Form} Form - Form.
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
        if(this.htmls[0].classList.contains('ckeditor')){
            return true;
        }else{
            return false;
        }
    }

    /**
     * * Add an Input HTML Element.
     * @param {*} newInput - New Input HTML Element.
     * @memberof Input
     */
    addInput(newInput){
        this.htmls.push(newInput);
    }
    
    /**
     * * Get all the Form <input> HTML Element.
     * @static
     * @param {Form} Form - Form.
     * @returns
     * @memberof Input
     */
    static getHTMLElements(Form = undefined){
        let auxHtml = document.querySelectorAll(`form#${Form.properties.id} .form-input`),
            htmls = [],
            names = [];
        for (const html of auxHtml) {
            let name = html.name;
            if(/\[/.exec(name)){
                name = name.split('[').shift();
            }
            if(html.type != 'checkbox'){
                if(names.indexOf(name) == -1){
                    htmls.push(new this({id: Form.properties.id}, html, Form));
                    names.push(name);
                }else{
                    htmls[names.indexOf(name)].addInput(html);
                }
            }else{
                if(!htmls.length){
                    htmls.push(new this({id: Form.properties.id}, html, Form));
                }else{
                    let push = true;
                    for (const htmlPushed of htmls) {
                        if(htmlPushed.properties.type == 'checkbox'){
                            if(htmlPushed.properties.name == name){
                                push = false;
                                htmlPushed.addInput(html);
                            }
                        }
                    }
                    if(push){
                        htmls.push(new this({id: Form.properties.id}, html, Form));
                    }
                }
            }
        }
        return htmls;
    }

    /**
     * Find if the Input exist in an auxiliar array.
     * @param {HTMLElement[]} inputs - The auxiliar array.
     * @param {string} name - The input name.
     * @param {string} className - The form parent class name.
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