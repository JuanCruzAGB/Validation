let Validator = {
    /**
     * Make an input valid.
     * @param {html} input - The input.
     * @param {html} tooltip - The tooltip.
     * @param {string} message - The error message.
     */
    set(input, tooltip){
        input.classList.add('valid');
        input.classList.remove('invalid');
        tooltip.classList.remove('showed');
    },
};