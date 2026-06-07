let error = new Error('429 status code (no body)');
let errorMessage = error.response?.data?.error?.message || error.response?.data || error.message;
if (typeof errorMessage === 'string' && errorMessage.includes('429')) {
    errorMessage = 'API Rate Limit Exceeded. Please wait a few seconds and try again.';
}
console.log(JSON.stringify({ success: false, message: errorMessage }));
