import { useState } from "react";
import { ChevronDown, ChevronUp, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const BrowseCollectionDrawer = ({ closeDrawerRight }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ulItem = [
    {
      name: "Electronics",
      icon: "📱",
      items: [
        "iPhone 15 Pro Max",
        "Macbook M3",
        "Airpods Pro",
        "Xtra Vision Pro",
        "Smart Watches",
        "Televisions",
        "PlayStation",
        "Cleaner Robot",
        "Others",
      ],
    },
    {
      name: "Home Appliance",
      icon: "🏠",
      items: [
        "Refrigerator",
        "Washing machine",
        "Dishwasher",
        "Vacuum cleaner",
        "Steam Iron",
        "Food processor",
        "Juicer",
        "Others",
      ],
    },
    {
      name: "Entertainment",
      icon: "🎮",
      items: [
        "PlayStation",
        "Xbox",
        "Game Console",
        "PS Games",
        "Gift cards",
        "Nostalgic consoles",
        "Custom controllers",
        "Custom badges",
        "Others",
      ],
    },
    {
      name: "Sports",
      icon: "⚽",
      items: [
        "Supplements",
        "Sport clothes",
        "Ski clothes",
        "GYM equipment",
        "GYM Tutorials",
        "Custom tools",
        "Sports socks",
        "Sports underwear",
      ],
    },
    {
      name: "Supermarket",
      icon: "🛒",
      items: [
        "Meat & Poultry",
        "Fresh dairy products",
        "Dried fruits",
        "Fruitage",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#284980] text-white">
      {/* Clickable Header */}
      <button
        className="flex justify-between items-center w-full px-4 py-3 text-lg font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        Browse Collection {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* ✅ Animated Collapsible Section */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="mt-2 space-y-1">
          {ulItem.map((category, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-2 px-4 py-2 border-t border-white/20 w-full"
            >
              <Link
                to={`/product-category/${category.name}`}
                className="flex items-center"
                onClick={() => closeDrawerRight()}
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default BrowseCollectionDrawer;
