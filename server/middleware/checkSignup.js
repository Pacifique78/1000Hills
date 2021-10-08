import Joi from "joi";
import validationHelper from "../helpers/ValidationHelper.js";

const checkSignUp = (req, res, next) => {
  const signupSchemas = Joi.object().keys({
    name: Joi.string().trim().max(255).required(),
    email: Joi.string()
      .trim()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
      .error(() => ({
        message: "email is not valid",
      })),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, signupSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkSignUp;
