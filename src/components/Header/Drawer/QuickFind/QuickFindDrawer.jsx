import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, LinkIcon } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const menuItems = [
  {
    title: "Categories",
    items: [
      "Home Appliance",
      "Electronics",
      "Sports",
      "Furniture",
      "Entertainment",
      "Supermarket",
    ],
  },
  {
    title: "Top Tags",
    items: ["Apple", "Furniture", "Laptop", "Mobile", "Game"],
  },
  {
    title: "Quick Access",
    items: ["About", "FAQ", "My Account", "Orders"],
  },
];

const QuickFindDrawer = ({ closeDrawerRight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full bg-[#284980] text-white py-1">
      {/* Clickable Header */}
      <button
        className="flex justify-between items-center w-full pr-4 py-3 text-lg font-semibold pl-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        Quick find {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* ✅ Animation for Quick Find opening */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          {menuItems.map(({ title, items }) => (
            <div key={title}>
              <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>
              <button
                className="flex justify-between items-center bg-[#284980] w-full pr-4 py-3 text-[14px] font-semibold pl-4"
                onClick={() => toggleSection(title)}
              >
                {title} {openSections[title] ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* ✅ Animation for each section */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  openSections[title]
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mt-2 space-y-1">
                  {items.map((item) => (
                    <div key={item}>
                      <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>
                      <Link
                        to={
                          title === "Categories"
                            ? `/product-category/${item}`
                            : "#"
                        }
                        onClick={() => closeDrawerRight()}
                      >
                        <li className="p-2 pl-4 bg-[#284980] rounded-md flex items-center">
                          <LinkIcon className="w-4 h-4 mr-1" />
                          {item}
                        </li>
                      </Link>
                    </div>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default QuickFindDrawer;
