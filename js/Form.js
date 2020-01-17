class Form{
    /**
     * Form constructor.
     * @param {HTMLElement} form - The form tag.
     * @param {string} number - The form number.
     */
    constructor(form, number){
        this.HTML = form;
        this.HTML.classList.add('form-validation-' + number);
        this.className = '.form-validation-' + number;
        this.setSubmit();
        this.setInputs();
        this.setRules();
        this.setMessages();
    }
    /** Set the submit buttons. */
    setSubmit(){
        let aux = this;
        this.submit = document.querySelector(this.className + ' .form-submit');
        this.submit.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(aux.className);
        });
    }
    /** Set all the inputs and textareas. */
    setInputs(){
        let HTMLElements = Input.getHTMLElements(this.className);
        let aux = [];
        for(let HTMLElement of HTMLElements){
            aux.push(new Input(HTMLElement.name, this.className, aux));
        }
        this.inputs = aux;
    }
    /** Set the Form Rules. */
    setRules(){
        this.rules = [];
        let rules = Rule.getAll(this.className);
        for(let target in rules){
            if(target.search(/\./) > 0){
                Rule.addArrayMode(this.rules, target, rules[target]);
            }else{
                this.rules.push(new Rule(target, rules[target]));
            }
        }
    }
    /** Set the Form Messages. */
    setMessages(){
        this.messages = [];
        let messages = Message.getAll(this.className);
        for(let target in messages){
            if(target.search(/\.\*\./) > 0){
                Message.addArrayMode(this.messages, target, messages[target]);
            }else{
                Message.push(this.messages, target, messages[target]);
            }
        }
    }
    /**
     * Get an input.
     * @param {string} name - The Input name.
     * @return {Input}
     */
    getInput(name){
        let selected = [];
        for(let input of this.inputs){
            if(input.name == name){
                selected.push(input);
            }
        }
        selected = this.getCKEditor(selected);
        return selected;
    }
    /**
     * Get the CKEditor value
     * @param {Input[]} selected - All the inputs selected.
     * @return {Input[]}
     */
    getCKEditor(selected){
        for(let input of selected){
            if(input.HTML && input.HTML.classList.contains('ckeditor')){
                let HTML = CKEDITOR.instances[input.HTML.id].getSnapshot();
                let div = document.createElement("div");
                div.innerHTML = HTML;
                let plain_text = (div.textContent || div.innerText);
                input.HTML.value = plain_text;
            }
        }
        return selected;
    }
    /**
     * Find a Form by his class name.
     * @param {Form[]} forms - All the Forms made.
     * @param {string} className - The Form class name.
     */
    static get(forms, className){
        for(let form of forms){
            if(form.className == className){
                return form;
            }
        }
    }
};