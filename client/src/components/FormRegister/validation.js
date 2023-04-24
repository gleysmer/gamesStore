const blankSpace = /^\s+$/ // No espacio en blanco
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i // Email válido
const regexPassword = /^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/ // Password al menos un número

export default function validation(values) {
    const errors = {}

    if (!values.name) errors.name = 'The first name is required'
    if (values.name.length > 40) errors.name = 'The first name must have less than 40 characters'
    if (!regexLetters.test(values.name)) errors.name = 'The name cannot contain numbers or symbols'
    if (blankSpace.test(values.name)) errors.name = 'The name cannot be a blank space'
    
    if (!values.surname) errors.surname = 'The surname is required'
    if (values.surname.length > 40) errors.surname = 'The surname must have less than 40 characters'
    if (!regexLetters.test(values.surname)) errors.surname = 'The surname cannot contain numbers or symbols'
    if (blankSpace.test(values.surname)) errors.surname = 'The surname cannot be a blank space'

    if (!values.email) errors.email = 'The email is required'
    if (values.email.length > 60) errors.email = 'The email must have less than 60 characters'
    if (!regexEmail.test(values.email)) errors.email = 'Please enter a valid email'
    if (blankSpace.test(values.email)) errors.email = 'The email cannot be a blank space'

    if (!values.password) errors.password = 'The password is required'
    if (values.password.length < 8) errors.password = 'The password must have more than 8 characters'
    if (values.password.length > 15) errors.password = 'The password must have less than 15 characters'
    if (!regexPassword.test(values.password)) errors.password = 'The password must contain at least one number'

    return errors;
}