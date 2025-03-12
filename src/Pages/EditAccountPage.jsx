import { Input } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../reduxSystem/slices/editProfileSlice";
import { fetchUserData } from "../reduxSystem/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../reduxSystem/slices/editPasswordSlice";
import { Eye, EyeOff } from "lucide-react"; // أيقونات العين
import Swal from "sweetalert2";

const EditAccountPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isProfileEdited, isEditProfLoading } = useSelector(
    (state) => state.userSliceState
  );

  const { userData } = useSelector((state) => state.authState);

  // console.log("userData", userData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchUserData(token));
  }, [isProfileEdited]);

  // 🔹 نموذج البيانات الشخصية
  const personalFormik = useFormik({
    initialValues: {
      fname: userData?.fname || "",
      lname: userData?.lname || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
    },
    enableReinitialize: true, // ✅ إعادة التهيئة عند تحديث userData
    validationSchema: Yup.object({
      fname: Yup.string().required("First name is required"),
      lname: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      const updatedFields = {};

      // استخراج القيم التي تغيرت فقط
      Object.keys(values).forEach((key) => {
        if (values[key] !== userData[key]) {
          updatedFields[key] = values[key]; // ✅ فقط الحقول المعدلة
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        dispatch(updateUserInfo(updatedFields)); // 🔥 إرسال القيم المعدلة فقط
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: "Your changes have been saved!",
          confirmButtonColor: "#284980",
        });
      } else {
        console.log("⚠️ لا يوجد تغييرات!");
        Swal.fire({
          icon: "info",
          title: "No Changes Detected!",
          text: "You haven’t modified any data.",
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  // 🔹 نموذج تغيير كلمة المرور
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("Password updated:", values);
      const { currentPassword, newPassword } = values;
      console.log("currentPassword updated:", currentPassword);
      console.log("newPassword updated:", newPassword);
      dispatch(changePassword({ currentPassword, newPassword }));
    },
  });

  // 🔹 حالة إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="header">
        <p className="text-3xl font-semibold text-[#284980]">
          {t("editAccount")}
        </p>
      </div>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      {/* ✅ فورم المعلومات الشخصية */}
      <form onSubmit={personalFormik.handleSubmit}>
        <div className="inputs flex md:justify-between md:flex-row flex-col">
          <div className="firstName md:w-[40%] w-full">
            <Input
              name="fname"
              variant="static"
              label={t("firstName")}
              placeholder={t("enterYourFirstName")}
              className="border-[#284980]"
              {...personalFormik.getFieldProps("fname")}
            />
            {personalFormik.touched.fname && personalFormik.errors.fname && (
              <p className="text-red-500 text-sm mt-2">
                {personalFormik.errors.fname}
              </p>
            )}
          </div>

          <div className="lastName md:w-[40%] w-full md:mt-0 mt-8 mb-4">
            <Input
              name="lname"
              variant="static"
              label={t("lastName")}
              placeholder={t("enterYourLastName")}
              className="border-[#284980]"
              {...personalFormik.getFieldProps("lname")}
            />
            {personalFormik.touched.lname && personalFormik.errors.lname && (
              <p className="text-red-500 text-sm mt-2">
                {personalFormik.errors.lname}
              </p>
            )}
          </div>
        </div>

        <div className="emailAddress mt-[4%]">
          <Input
            name="email"
            variant="static"
            label={t("emailAddress")}
            placeholder={t("enterYourEmailAddress")}
            className="border-[#284980]"
            {...personalFormik.getFieldProps("email")}
          />
          {personalFormik.touched.email && personalFormik.errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {personalFormik.errors.email}
            </p>
          )}
        </div>

        <div className="phone mt-[4%]">
          <Input
            name="phone"
            variant="static"
            label={t("phone")}
            placeholder={t("enterYourPhoneNumber")}
            className="border-[#284980]"
            {...personalFormik.getFieldProps("phone")}
          />
          {personalFormik.touched.phone && personalFormik.errors.phone && (
            <p className="text-red-500 text-sm mt-2">
              {personalFormik.errors.phone}
            </p>
          )}
        </div>

        <div className="btn mt-9 flex sm:justify-start justify-center">
          <button
            type="submit"
            className="bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("saveChanges")}
          </button>
        </div>
      </form>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-10 mb-9"></div>

      {/* ✅ فورم تغيير كلمة المرور */}
      <form onSubmit={passwordFormik.handleSubmit}>
        <div className="changepassword mt-9">
          <p className="text-lg text-[#284980] font-semibold">
            {t("passwordChange")}
          </p>
        </div>

        {["currentPassword", "newPassword", "confirmPassword"].map(
          (field, index) => (
            <div key={index} className="relative mt-[5%]">
              <Input
                type={showPassword[field] ? "text" : "password"}
                name={field}
                variant="static"
                label={t(field)}
                placeholder={t(
                  `enterYour${field.charAt(0).toUpperCase() + field.slice(1)}`
                )}
                className="border-[#284980] pr-10"
                {...passwordFormik.getFieldProps(field)}
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => togglePasswordVisibility(field)}
              >
                {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {passwordFormik.touched[field] &&
                passwordFormik.errors[field] && (
                  <p className="text-red-500 text-sm mt-2">
                    {passwordFormik.errors[field]}
                  </p>
                )}
            </div>
          )
        )}

        <div className="btn mt-9 flex sm:justify-start justify-center">
          <button
            type="submit"
            className="bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("change Password")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountPage;
