import { Button, Input, TabPanel, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useFormik } from "formik";
import { BasicSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../reduxSystem/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LogIn = ({ showPasswordLogIn, togglePasswordLogInVisibility }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authState);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        emailLogIn: "",
        passwordLogIn: "",
      },
      // validationSchema: BasicSchema,
      onSubmit: (values) => {
        let data = {
          email: values.emailLogIn,
          password: values.passwordLogIn,
        };

        dispatch(logInUser(data));

        // console.log("✅ Form Submitted:", data);

        navigate("/");
        alert("Logged In");
      },
    });

  console.log("Log In Errors:", errors);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div>
      <TabPanel value="paypal" className="p-0">
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
          <div>
            <Input
              required
              variant="standard"
              id="emailLogIn"
              label={
                <span
                  className={
                    errors.emailLogIn && touched.emailLogIn
                      ? "text-red-600"
                      : "text-[#284980]"
                  }
                >
                  {t("email")}
                </span>
              }
              placeholder={t("enterYourEmail")}
              type="email"
              value={values.emailLogIn}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.emailLogIn && touched.emailLogIn
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              }
            />

            {errors.emailLogIn && touched.emailLogIn && (
              <Typography
                variant="body2"
                className="text-red-600 mt-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
                {errors.emailLogIn}
              </Typography>
            )}
          </div>

          <div className="my-6">
            <div className="flex">
              <Input
                required
                variant="standard"
                label={
                  <span
                    className={
                      errors.passwordLogIn && touched.passwordLogIn
                        ? "text-red-600"
                        : "text-[#284980]"
                    }
                  >
                    {t("password")}
                  </span>
                }
                id="passwordLogIn"
                placeholder={t("enterYourPassword")}
                type={showPasswordLogIn ? "password" : "text"}
                value={values.passwordLogIn}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.passwordLogIn && touched.passwordLogIn
                    ? "border-red-600 text-red-600"
                    : "border-[#284980]"
                }
              />
              <span
                className="flex flex-col justify-center mt-2"
                onClick={() => togglePasswordLogInVisibility()}
              >
                {showPasswordLogIn ? (
                  <FiEye aria-label={t("hidePassword")} />
                ) : (
                  <FiEyeOff aria-label={t("showPassword")} />
                )}
              </span>
            </div>

            {errors.passwordLogIn && touched.passwordLogIn && (
              <Typography
                variant="body2"
                className="text-red-600 mt-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
                {errors.passwordLogIn}
              </Typography>
            )}
          </div>
          <Button type="submit" className="bg-[#284980]" size="lg">
            {t("logIn")}
          </Button>
        </form>
      </TabPanel>
    </div>
  );
};

export default LogIn;
