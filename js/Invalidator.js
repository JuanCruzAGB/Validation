let Invalidator = {
    /**
     * Make an input invalid.
     * @param {object} error - The error.
     * @param {string} message - The error message.
     */
    set(error, message){
        error.input.HTML.classList.remove('valid');
        error.input.HTML.classList.add('invalid');
        error.input.tooltip.innerHTML = message;
        error.input.tooltip.classList.add('showed');
    },
};