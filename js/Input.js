/**
 * Manage all the <input> created.
 * @class Input
 */
class Input{
    /**
     * Input constructor.
     * @param {string} name - The input name.
     * @param {string} className - The form parent class name.
     * @param {Input[]} inputs - All the Inputs created.
     */
    constructor(name, className, inputs){
        this.parentClassName = className;
        this.setData(name, inputs);
        this.setSupport();
        this.addEvent();
    }
    /**
     * Set the basic data.
     * @param {string} name - The input name.
     * @param {Input[]} inputs All the Inputs created.
     */
    setData(name, inputs){
        if(name.search(/\[/) > 0){
            this.name = name.split('[')[0];
            let i = 1;
            for(let input of inputs){
                if(input.name == this.name){
                    i++;
                }
            }
            this.array = i;
            let HTMLElements = document.querySelectorAll(this.parentClassName + " [name='" + name + "']");
            for(let i = 1; i <= HTMLElements.length; i++){
                if(this.array == i){
                    this.HTML = HTMLElements[i - 1];
                }
            }
        }else{
            this.name = name;
            this.HTML = document.querySelector(this.parentClassName + " [name='" + this.name + "']");
        }
    }
    /** Set the Support HTML. */
    setSupport(){
        if(document.querySelector(this.parentClassName + " ." + this.name)){
            this.support = new Support(this.parentClassName + " ." + this.name, this);
        }
    }
    /** Add an event to the Input HTML. */
    addEvent(){
        let aux = this;
        if(this.HTML.type == 'text' ||
        this.HTML.type == 'email' ||
        this.HTML.type == 'numeric' ||
        this.HTML.type == 'password' ||
        !this.HTML.hasAttribute('type')){
            this.findCKEditor();
            this.HTML.addEventListener('keyup', function(e){
                e.preventDefault();
                Validation.validate(aux.parentClassName, aux);
            });
        }else{
            this.HTML.addEventListener('change', function(e){
                e.preventDefault();
                Validation.validate(aux.parentClassName, aux);
            });
        }
    }
    /** Find if there is a CKEditor on the Input. */
    findCKEditor(){
        let aux = this;
        if(this.HTML.classList.contains('ckeditor')){
            CKEDITOR.instances[this.HTML.name].on('change', function(){
                CKEDITOR.instances[aux.HTML.name].updateElement();
                Validation.validate(aux.parentClassName, aux);
            });
        }
    }
    /**
     * Find all the Inputs in the Form.
     * @param {string} className - The Form class name.
     */
    static getHTMLElements(className){
        return document.querySelectorAll(className + ' input,' + className + ' textarea');
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