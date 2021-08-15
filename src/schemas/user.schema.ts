import {object, string, ref} from 'yup'

//Creates a new instance of valid UserDocument
const createUserSchema = object({
 body: object({
  name: string().required('Name is required'),
  password: string()
   .required('Password is required')
   .min(6, 'Password must be at least 6 characters')
   .matches(
    /^[a-zA-Z0-9_.-]*$/,
    'password can only contain latin letters and numbers',
   ),
  passwordConfirmation: string()
   .required('passwordConfirmation is required')
   .oneOf([ref('password'), null], 'Passwords must match'),
  email: string()
   .email('must be a valid email address')
   .required('Email is required'),
 }),
})

const createUserSessionSchema = object({
 body: object({
  password: string()
   .required('Password is required')
   .min(6, 'Password must be at least 6 characters')
   .matches(
    /^[a-zA-Z0-9_.-]*$/,
    'password can only contain latin letters and numbers',
   ),
  email: string()
   .email('must be a valid email address')
   .required('Email is required'),
 }),
})

export {createUserSchema, createUserSessionSchema}
