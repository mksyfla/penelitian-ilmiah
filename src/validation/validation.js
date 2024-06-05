const InvariantError = require('../exceptions/InvariantError');

function validate(schema, body) {
  console.log(body);
  const result = schema.validate(body);

  if (result.error) {
    throw new InvariantError(result.error.message);
  } else {
    return result.value;
  }
}

module.exports = { validate };
