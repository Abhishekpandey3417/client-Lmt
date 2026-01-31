import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkBase =
    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors";
  const linkActive =
    "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white";
  const linkInactive =
    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className="
          hidden lg:block
          w-[260px]
          border-r border-gray-200 dark:border-gray-800
          bg-gray-100 dark:bg-gray-900
          px-5 py-6
          sticky top-0 h-screen
        "
      >
        <div className="mt-16 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`${linkBase} ${
              location.pathname.includes("dashboard")
                ? linkActive
                : linkInactive
            }`}
          >
            <ChartNoAxesColumn size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/admin/courses"
            className={`${linkBase} ${
              location.pathname.includes("courses")
                ? linkActive
                : linkInactive
            }`}
          >
            <SquareLibrary size={20} />
            <span className="font-medium">Courses</span>
          </Link>
        </div>
      </aside>

      {/* Content area */}
      <main className="flex-1 p-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
