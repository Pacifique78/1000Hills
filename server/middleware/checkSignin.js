import Joi from "joi";
import validationHelper from "../helpers/ValidationHelper.js";

const checkSignIn = (req, res, next) => {
  const signinSchemas = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
      .error(() => ({
        message: "email is not valid",
      })),
    password: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, signinSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkSignIn;
