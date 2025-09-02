import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, sidebarRef }) {
  const sidebarItems = [
    { label: "Home", icon: "fa fa-home", path: "/" },
    { label: "Trending", icon: "fa fa-fire" },
    { label: "Subscriptions", icon: "fa fa-play-circle" },
    { label: "Library", icon: "fa fa-folder" },
    { label: "History", icon: "fa fa-clock" },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`h-screen bg-white shadow-md border-r transition-all duration-300 ease-in-out
        ${isOpen ? "w-60" : "w-20"} 
        fixed md:relative z-10`}
    >
      <ul className="mt-4">
        {sidebarItems.map(({ label, icon, path }) => (
          <li key={label} className="mb-1">
            {path ? (
              <Link
                to={path}
                onClick={onClose}
                className={`flex items-center ${
                  isOpen ? "justify-start px-4" : "justify-center"
                } py-3 hover:bg-gray-100 rounded-xl transition`}
              >
                <i className={`${icon} text-xl text-gray-700`}></i>
                {isOpen && (
                  <span className="ml-5 text-sm font-medium text-gray-800">
                    {label}
                  </span>
                )}
              </Link>
            ) : (
              <div
                className={`flex items-center ${
                  isOpen ? "justify-start px-4" : "justify-center"
                } py-3 hover:bg-gray-100 rounded-xl cursor-pointer transition`}
              >
                <i className={`${icon} text-xl text-gray-700`}></i>
                {isOpen && (
                  <span className="ml-5 text-sm font-medium text-gray-800">
                    {label}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
