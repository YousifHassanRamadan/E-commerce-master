import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
} from "@material-tailwind/react";
import { FiLogIn } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { useFormik } from "formik";
import { BasicSchema } from "../schemas/index";
import LogIn from "../components/Form/LogIn";
import SignUp from "../components/Form/SignUp";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { signUpUser } from "../reduxSystem/slices/authSlice";
import { useDispatch } from "react-redux";

const LogInAndSignUp = () => {
  const { t } = useTranslation();
  const [type, setType] = useState("card");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordLogIn, setShowPasswordLogIn] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordLogInVisibility = () => {
    setShowPasswordLogIn((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth={"md"}
      className="mx-auto container my-16 flex justify-center items-center"
    >
      <Card className="w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center bg-[#284980]"
        >
          <div className="mb-4 h-20 p-6 text-white">
            {type === "card" ? (
              <BiSolidEdit
                className="h-10 w-10 text-white"
                aria-label={t("signUpIcon")}
              />
            ) : (
              <FiLogIn
                className="h-10 w-10 text-white"
                aria-label={t("logInIcon")}
              />
            )}
          </div>
          {type === "card" ? (
            <Typography variant="h5" color="white">
              {t("signUp")}
            </Typography>
          ) : (
            <Typography variant="h5" color="white">
              {t("logIn")}
            </Typography>
          )}
        </CardHeader>

        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0">
              <Tab value="card" onClick={() => setType("card")}>
                {t("signUp")}
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                {t("logIn")}
              </Tab>
            </TabsHeader>

            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              {/* Start Sign Up */}
              <SignUp
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                showConfirmPassword={showConfirmPassword}
                toggleConfirmPasswordVisibility={
                  toggleConfirmPasswordVisibility
                }
                setType={setType}
              />
              {/* End Sign Up */}

              {/* Start Login */}
              <LogIn
                showPasswordLogIn={showPasswordLogIn}
                togglePasswordLogInVisibility={togglePasswordLogInVisibility}
              />
              {/* End Login */}
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  );
};

export default LogInAndSignUp;
