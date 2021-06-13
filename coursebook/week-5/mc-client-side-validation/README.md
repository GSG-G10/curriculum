# Client-side Validation

In this challenge, you'll be **styling and validating a sign up form**, a common use case for client-side validation.

## What is client-side validation?

Form validation is the process of checking the user has entered the required information in the correct format. As a simple example, usually an email address input must contain an '@' symbol.

'Client-side' means the validation happens in the browser, not the server.

### Benefits

- Client-side validation can be a **great UX win** when implemented well, giving users instant and helpful feedback. It is a powerful and now very common feature- check out the sign-up form on one of your favourite websites for inspiration.
- It also **reduces server load**, by stopping requests with invalid data from being sent.

### Important Note

Client-side validation **does not offer increased security**, because 'invalid' requests can easily be sent outside of the browser, e.g. using a tool like `curl`. Therefore client-side validation should be used in addition to server-side validation.

## The challenge

Implement client-side validation on a sign-up form!

![validation-challenge-1](https://user-images.githubusercontent.com/2305591/29023296-0c2107a2-7b65-11e7-9577-5eafb9683a4b.png)

### Requirements:

* Display the appropriate error messages **when the user clicks the submit button**, as in the pictures.

* Style the form! You can use the design as a guide but **making your own stylistic choices is strongly encouraged!**

* HTML5 validation is allowed, but **do not** use the default _styling_- it must be custom styled.

### Stretch goals

* add extra functionality for the password field, which guides users to create stronger passwords.
* Improve the UX by providing useful feedback **before** the user presses submit, e.g. on the `blur` event of an input field.

## Resources

[MDN form validation docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
