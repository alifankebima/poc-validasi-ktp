import Joi from 'joi';

const formRegister = Joi.object({
    trId: Joi.string().required(),
    nik: Joi.string().min(15).max(16).required().messages({
        'string.base': '"NIK" must be a string',
        'string.empty': '"NIK" cannot be empty',
        'string.min': '"NIK" should have at least {#limit} characters',
        'string.max': '"NIK" is more than {#limit} character',
        'any.required': '"NIK" is a required field'
      }),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().max(100).required().messages({
        'string.base': '"Fullname" must be a string',
        'string.empty': '"Fullname" cannot be empty',
        'string.max': '"Fullname" is more than {#limit} character',
        'any.required': '"Fullname" is a required field'
      }),
    dob: Joi.date().required().messages({
        'string.base': 'Invalid Date of Birth',
        'string.empty': '"Date of Birth" cannot be empty',
        'any.required': '"Date of Birth" is a required field'
      }),
    phone: Joi.string().min(10).max(16).pattern(/^\S+$/).required().messages({
        'string.base': 'Invalid Phone Number',
        'string.min': '"Phone Number" should have at least {#limit} characters',
        'string.max': '"Phone Number" is more than {#limit} character',
        'string.empty': '"Phone Number" cannot be empty',
        'any.required': '"Phone Number" is a required field'
      }),
    selfie: Joi.string().allow(""),
    ktp: Joi.string().allow("")
});

export default formRegister;