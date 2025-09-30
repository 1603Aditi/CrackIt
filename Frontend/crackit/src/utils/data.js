import {
  LuLayoutDashboard,
  LuFileText,
  LuMessageSquare,
  LuListChecks,
  LuUser,
  LuLogOut,
  LuGroup,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
  { id: "02", label: "Experiences", icon: LuFileText, path: "/experiences" },
  { id: "03", label: "My Advises", icon: LuMessageSquare, path: "/advice" },
  { id: "04", label: "Practice Qs", icon: LuListChecks, path: "/practice" },
  { id: "08", label:"Community",icon:LuGroup,path:"/community"},
  { id: "05", label: "Profile", icon: LuUser, path: "/profile" },
  { id: "07", label: "Logout", icon: LuLogOut, path: "/logout" },
  
];
