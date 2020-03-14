let Validator = {
    /**
     * Make an input valid.
     * @param {Input[]} inputs - The Inputs.
     */
    set(inputs){
        for(let input of inputs){
            input.HTML.classList.remove('invalid');
            input.HTML.classList.add('valid');
            input.support.removeError();
        }
    },
};