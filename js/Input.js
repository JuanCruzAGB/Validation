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
        this.setHTML(html);
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
                this.properties.type = null;
                break;
        }
    }

    /**
     * * Set the Input name.
     * @memberof Input
     */
    setName(){
        this.properties.name = this.htmls[0].name;
    }

    /**
     * * Set the Input HTML Element.
     * @param {HTMLElement} html - Input HTML Element.
     * @memberof Input
     */
    setHTML(html = undefined){
        this.htmls = [];
        this.htmls.push(html);
    }

    /**
     * * Set the Input Support.
     * @memberof Input
     */
    setSupport(){
        let html;
        if(html = document.querySelector(`#${this.properties.id} [name=${this.properties.name}] + .support`)){
            this.support = new Support(html);
        }
    }

    /**
     * * Set the Input event.
     * @memberof Input
     */
    setEvent(Form = undefined){
        let instance = this;
        switch (this.properties.type) {
            case 'checkbox':
                console.log(this);
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
                        CKEDITOR.instances[this.html.name].on('change', function(){
                            CKEDITOR.instances[instance.html.name].updateElement();
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
        let auxHtml = document.querySelectorAll(`#${Form.properties.id} input.form-input, #${Form.properties.id} textarea.form-input`),
            htmls = [],
            names = [];
        for (const html of auxHtml) {
            if(names.indexOf(html.name) == -1){
                htmls.push(new this({id: Form.properties.id}, html, Form));
                names.push(html.name);
            }else{
                htmls[names.indexOf(html.name)].addInput(html);
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