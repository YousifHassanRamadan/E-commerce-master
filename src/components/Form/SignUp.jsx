import { Button, Input, TabPanel, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useFormik } from "formik";
import { signUpUser } from "../../reduxSystem/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BasicSchema } from "../../schemas";
import Swal from "sweetalert2";

const SignUp = ({
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  setType,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { signUpErr } = useSelector((state) => state.authState);

  useEffect(() => {
    if (signUpErr === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This Account is Already Exist. Please Try Another One!",
      });
    } else if (signUpErr === false) {
      Swal.fire({
        icon: "success",
        text: "Done!",
      });
    }
  }, [signUpErr]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
      },
      validationSchema: BasicSchema,
      onSubmit: (values) => {
        let data = {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          phone: values.phone,
          password: values.password,
        };
        // console.log("✅ Form Submitted:", data);
        dispatch(signUpUser(data));
      },
    });

  console.log("Sign Up Errors:", errors);

  console.log("redux Errors:", signUpErr);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div>
      <TabPanel value="card" className="p-0 ">
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
          {/*First Name */}
          <div className="mb-2">
            <Input
              required
              variant="standard"
              label={
                <span
                  className={
                    errors.fname && touched.fname
                      ? "text-red-600"
                      : "text-[#284980]"
                  }
                >
                  {t("userFname")}
                </span>
              }
              id="fname"
              placeholder={t("enterYourName")}
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.fname && touched.fname
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              }
            />
            {errors.fname && touched.fname && (
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
                {errors.fname}
              </Typography>
            )}
          </div>

          {/*Last Name */}
          <div className="mb-2">
            <Input
              required
              variant="standard"
              label={
                <span
                  className={
                    errors.lname && touched.lname
                      ? "text-red-600"
                      : "text-[#284980]"
                  }
                >
                  {t("userLname")}
                </span>
              }
              id="lname"
              placeholder={t("enterYourName")}
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.lname && touched.lname
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              }
            />
            {errors.lname && touched.lname && (
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
                {errors.lname}
              </Typography>
            )}
          </div>

          {/*Phone Number */}
          <div className="mb-2">
            <Input
              required
              variant="standard"
              label={
                <span
                  className={
                    errors.phone && touched.phone
                      ? "text-red-600"
                      : "text-[#284980]"
                  }
                >
                  {t("phone")}
                </span>
              }
              id="phone"
              placeholder={t("enterphone")}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.phone && touched.phone
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              }
            />
            {errors.phone && touched.phone && (
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
                {errors.phone}
              </Typography>
            )}
          </div>

          {/*Email*/}
          <div className="my-2">
            <Input
              required
              variant="standard"
              id="email"
              label={
                <span
                  className={
                    errors.email && touched.email
                      ? "text-red-600"
                      : "text-[#284980]"
                  }
                >
                  {t("email")}
                </span>
              }
              placeholder={t("enterYourEmail")}
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              }
            />

            {errors.email && touched.email && (
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
                {errors.email}
              </Typography>
            )}
          </div>

          {/*Password*/}
          <div className="my-2">
            <div className="flex">
              <Input
                required
                variant="standard"
                label={
                  <span
                    className={
                      errors.password && touched.password
                        ? "text-red-600"
                        : "text-[#284980]"
                    }
                  >
                    {t("password")}
                  </span>
                }
                id="password"
                placeholder={t("enterYourPassword")}
                type={showPassword ? "password" : "text"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "border-red-600 text-red-600"
                    : "border-[#284980]"
                }
              />
              <span
                className="flex flex-col justify-center mt-2"
                onClick={() => togglePasswordVisibility()}
              >
                {showPassword ? (
                  <FiEye aria-label={t("hidePassword")} />
                ) : (
                  <FiEyeOff aria-label={t("showPassword")} />
                )}
              </span>
            </div>

            {errors.password && touched.password && (
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
                {errors.password}
              </Typography>
            )}
          </div>

          {/*Check Password*/}
          <div className="my-2">
            <div className="flex">
              <Input
                required
                variant="standard"
                label={
                  <span
                    className={
                      errors.confirmPass && touched.confirmPass
                        ? "text-red-600"
                        : "text-[#284980]"
                    }
                  >
                    {t("confirmPassword")}
                  </span>
                }
                id="confirmPass"
                placeholder={t("enterYourPasswordAgain")}
                type={showConfirmPassword ? "password" : "text"}
                value={values.confirmPass}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPass && touched.confirmPass
                    ? "border-red-600 text-red-600"
                    : "border-[#284980]"
                }
              />
              <span
                className="flex flex-col justify-center mt-2"
                onClick={() => toggleConfirmPasswordVisibility()}
              >
                {showConfirmPassword ? (
                  <FiEye aria-label={t("hideConfirmPassword")} />
                ) : (
                  <FiEyeOff aria-label={t("showConfirmPassword")} />
                )}
              </span>
            </div>

            {errors.confirmPass && touched.confirmPass && (
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
                {errors.confirmPass}
              </Typography>
            )}
          </div>

          <Button size="lg" type="submit" className="bg-[#284980]">
            {t("submit")}
          </Button>
        </form>
      </TabPanel>
    </div>
  );
};

export default SignUp;
