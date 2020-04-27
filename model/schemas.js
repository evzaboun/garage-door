const Joi = require("@hapi/joi");

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  // repeat_password: Joi.ref('password'),

  // access_token: [
  //     Joi.string(),
  //     Joi.number()
  // ]
}).with("email", "password");
// .xor('password', 'access_token')
// .with('password', 'repeat_password');

//schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

//schema.validate({});
// -> { value: {}, error: '"username" is required' }
module.exports = schema;
