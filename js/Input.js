// ? ValidationJS repository.
import { Support } from "./Support.js";
import { Validation } from "./Validation.js";

/**
 * * Input controls the <input> created.
 * @export
 * @class Input
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Input{
    /**
     * * Creates an instance of Input.
     * @param {Object} [properties] Input properties:
     * @param {String} [properties.id] Input ID.
     * @param {String} [properties.type] Input type.
     * @param {String} [properties.name] Input name.
     * @param {HTMLElement} [html] Input HTML Element.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    constructor(properties = {
        id: 'input-1',
        type: 'text',
        name: 'input',
    }, states = {}, html = undefined, Form = undefined){
        this.setHTML(html, Form);
        this.setProperties(properties);
        this.setStates(states);
        this.setSupport();
        this.setEvent(Form);
    }

    /**
     * * Set the Input properties.
     * @param {Object} [properties] Input properties:
     * @param {String} [properties.id] Input ID.
     * @param {String} [properties.type] Input type.
     * @param {String} [properties.name] Input name.
     * @memberof Input
     */
    setProperties(properties = {
        id: 'input-1',
        type: 'text',
        name: 'input',
    }){
        this.properties = {};
        this.setIDProperty(properties);
        this.setTypeProperty(properties);
        this.setNameProperty(properties);
    }

    /**
     * * Returns the Input properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Input
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
     * @memberof Input
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
     * @memberof Input
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
     * * Set the Input ID.
     * @param {Object} [properties] Input properties:
     * @param {String} [properties.id] Input ID.
     * @memberof Input
     */
    setIDProperty(properties = {
        id: 'input-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'input-1';
        }
    }

    /**
     * * Returns the Input ID.
     * @returns {String}
     * @memberof Input
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Input type.
     * @param {Object} [properties] Input properties:
     * @param {String} [properties.type] Input type.
     * @memberof Input
     */
    setTypeProperty(properties = {
        type: 'text',
    }){
        if (properties.hasOwnProperty('type')) {
            this.properties.type = properties.type;
        } else {
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
    }

    /**
     * * Returns the Input type.
     * @returns {String}
     * @memberof Input
     */
    getTypeProperty(){
        return this.properties.type;
    }

    /**
     * * Set the Input name.
     * @param {Object} [properties] Input properties:
     * @param {String} [properties.name] Input name.
     * @memberof Input
     */
    setNameProperty(properties = {
        name: 'input',
    }){
        if (properties.hasOwnProperty('name')) {
            this.properties.name = properties.name;
        } else {
            let name = this.getHTMLs()[0].name;
            if (/\[/.exec(this.getHTMLs()[0].name)) {
                name = this.getHTMLs()[0].name.split('[').shift();
            }
            this.properties.name = name;
        }
    }

    /**
     * * Returns the Input name.
     * @returns {String}
     * @memberof Input
     */
    getNameProperty(){
        return this.properties.name;
    }

    /**
     * * Set the Input states.
     * @param {Object} [states] Input states:
     * @memberof Input
     */
    setStates(states = {}){
        this.states = {};
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Input
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
     * @memberof Input
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
     * @memberof Input
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
     * * Set the Input HTML Element.
     * @param {HTMLElement} [html] Input HTML Element.
     * @param {Form} [Form] Parent Form.
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
     * @returns {HTMLElement[]}
     * @memberof Input
     */
    getHTMLs(){
        return this.htmls;
    }

    /**
     * * Set the confirmation Input.
     * @param {Form} [Form] Parent Form.
     * @param {String} name Input name.
     * @memberof Input
     */
    setConfirmationInput(Form = undefined, name = undefined){
        if(!this.confirmation){
            this.confirmation = [];
        }
        let input = document.querySelector(`form#${ Form.getProperties('id') } .form-input[name="${ name }_confirmation"]`);
        this.confirmation.push(input);
        this.setConfirmationEvent(input, Form);
    }

    /**
     * * Returns the confirmation Input HTML Element.
     * @returns {HTMLElement[]}
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
        this.support = Support.getDomHTML(this);
    }

    /**
     * * Returns the Input Support.
     * @returns {Support}
     * @memberof Input
     */
    getSupport(){
        return this.support;
    }

    /**
     * * Check if there is an Input Support.
     * @returns {Boolean}
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
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    setEvent(Form = undefined){
        let instance = this;
        switch (this.getProperties('type')) {
            case 'file':
                this.getHTMLs()[0].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
            case 'radio':
                // TODO
                console.warn('In the To Do List.');
                break;
            case 'hidden':
                for (const btn of document.querySelectorAll(`.${ this.getProperties('name') }-trigger`)) {
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
                this.getHTMLs()[0].addEventListener('focusout', function(e){
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
                        this.getHTMLs()[0].addEventListener('focusout', function(e){
                            e.preventDefault();
                            Validation.validate(Form, instance);
                        });
                    }
                }else{
                    this.getHTMLs()[0].addEventListener('focusout', function(e){
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
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    setConfirmationEvent(input = undefined, Form = undefined){
        let instance = this;
        switch (input.type) {
            default:
                input.addEventListener('focusout', function(e){
                    e.preventDefault();
                    Validation.validate(Form, instance);
                });
                break;
        }
    }

    /**
     * * Check if the Input has a CKEditor.
     * @returns {Boolean}
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
     * @param {Form} [Form] Parent Form.
     * @returns {Input[]}
     * @memberof Input
     */
    static getAllDomHTML(Form = undefined){
        let auxHtml = document.querySelectorAll(`form#${ Form.getProperties('id') } .form-input`),
            htmls = [],
            names = [];
        for (const html of auxHtml) {
            let name = html.name;
            if(/\[/.exec(name)){
                name = name.split('[').shift();
            }
            if(html.type != 'checkbox'){
                if(names.indexOf(name) == -1){
                    htmls.push(new this({
                        id: `${ Form.getProperties('id') }-${ name }`,
                    }, {}, html, Form));
                    names.push(name);
                }else{
                    htmls[names.indexOf(name)].addInput(html);
                }
            }else{
                if(!htmls.length){
                    htmls.push(new this({
                        id: `${ Form.getProperties('id') }-${ name }`,
                    }, {}, html, Form));
                }else{
                    let push = true;
                    for (const htmlPushed of htmls) {
                        if(htmlPushed.getProperties('type') == 'checkbox'){
                            if(htmlPushed.getProperties('name') == name){
                                push = false;
                                htmlPushed.addInput(html);
                            }
                        }
                    }
                    if(push){
                        htmls.push(new this({
                            id: `${ Form.getProperties('id') }-${ name }`,
                        }, {}, html, Form));
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
     * @returns {Boolean}
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