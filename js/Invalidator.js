let Invalidator = {
    /**
     * Make an input invalid.
     * @param {Input[]} inputs - The Inputs.
     * @param {string} message - The error message.
     */
    set(inputs, message){
        for(let input of inputs){
            input.HTML.classList.remove('valid');
            input.HTML.classList.add('invalid');
            input.tooltip.innerHTML = message;
            input.tooltip.classList.add('showed');
        }
    },
};