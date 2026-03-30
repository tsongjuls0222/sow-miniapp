function validate(schema, property = "body") {
  return async (req, reply) => {
    const target = req[property] ?? {};

    const { error, value } = schema.validate(target, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });

    if (error) {
      return reply.status(400).send({
        status: 0,
        error: error.details.map((d) => d.message).join("; ")
      });
    }

    req[property] = value;
  };
}

module.exports = validate;