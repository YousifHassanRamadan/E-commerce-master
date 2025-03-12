import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import MapComponent from "./Map";
import { useTranslation } from "react-i18next";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" aria-label="Email Icon" />,
    title: "support",
    details: "support@yoursite.com",
    extraClass: "bg-blue-50",
  },
  {
    icon: <Phone className="w-6 h-6" aria-label="Phone Icon" />,
    title: "ourPhone",
    details: "+966 12 234 5678",
    extraClass: "bg-orange-50",
  },
  {
    icon: <MapPin className="w-6 h-6" aria-label="Location Icon" />,
    title: "location",
    details: "123 King Street Avenue",
    extraClass: "bg-green-50",
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white";

export default function ContactContent() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full">
      {/* Full-width Map */}
      <div className="w-full">
        <MapComponent />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg flex items-center space-x-4 border border-gray-100 transform transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100 hover:scale-105 ${info.extraClass}`}
            >
              <div className="shrink-0">{info.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{t(info.title)}</h3>
                <p className="text-gray-600">{info.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-[15%] mb-[15%]">
          <h2 className="text-4xl text-[#424a63] font-bold mb-4">
            {t("getInTouchWithUs")}
          </h2>
          <p className="text-lg text-[#424a63]">{t("feelFreeToContactUs")}</p>
        </div>

        {/* Contact Form Section */}
        <div className="relative bg-[#f1f2f6] rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="w-full text-center sm:w-[40%] flex items-center justify-center h-12 text-white -top-8 bg-[#284980] absolute left-1/2 transform -translate-x-1/2">
            {t("fillTheFormBelow")}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={t("yourName")}
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t("yourEmail")}
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder={t("subject")}
                  className={inputClass}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="department"
                  className={inputClass}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("selectDepartment")}
                  </option>
                  <option value="sales">{t("salesDepartment")}</option>
                  <option value="support">{t("supportDepartment")}</option>
                  <option value="technical">{t("technicalDepartment")}</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder={t("yourMessage")}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#f8c530] text-[#284980] px-8 py-3 rounded-lg hover:bg-[#284980] hover:text-[#f8c530] transition-colors cursor-pointer duration-300 delay-200"
              >
                {t("send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
