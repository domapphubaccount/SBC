import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { drawer_toggle } from "@/app/Redux/Features/Dashboard/SideBarSlice";
import Link from "next/link";
import { logoutAction } from "@/app/Redux/Features/Auth/AuthSlice";
import Logo from "@/assets/logo/icon.png";
import { chat_out } from "@/app/Redux/Features/Chat/ChatSlice";
import { set_direct_code } from "@/app/Redux/Features/Code/CodeSlice";
import MultipleSelect from "@/components/Chat/code/code";
import { usePathname } from "next/navigation";

export default function TemporaryDrawer() {
  const open = useSelector((state) => state.asideSlice.drawer);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const pathname = usePathname();


  const handleLogout = () => {
    dispatch(logoutAction({ token }));
  };

  const handleStartNewChat = () => {
    dispatch(chat_out());
    dispatch(set_direct_code([]));
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <Link href="/" class="flex items-center ps-2.5 mb-5">
          <img
            width={30}
            height={30}
            quality={100}
            src={Logo.src}
            alt="logo"
            className="mr-2"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            BYLD
          </span>
        </Link>

        <ul class="space-y-2 font-medium">
          {permissionsData && permissionsData.includes("openai.create_thread") && (
            <li
              title="start new chat"
              className="mr-3"
              onClick={handleStartNewChat}
            >
              <Link
                href="/"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span class="ms-3">Start Chat</span>
              </Link>
            </li>
          )}

          {pathname.trim().slice(0, 9) === "/"
            ? permissionsData &&
              permissionsData.includes("sections.pdf") && (
                <li
                  title="Code"
                  className="mr-3"
                >
                  <MultipleSelect />
                </li>
              )
            : ""}

          <li>
            <button
              type="submit"
              onClick={handleLogout}
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Sign out</span>
            </button>
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => dispatch(drawer_toggle())}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
