import * as React from "react";
import Box from "@mui/material/Box";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/assets/logo/icon.png";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  getHistoryAction,
  loading_get_chat_history,
} from "@/app/Redux/Features/Chat_History/historySlice";
import {
  choseChate,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import ArchiveSettings from "./ArchiveSettings";
import ArchiveAction from "./ArchiveActions/ArchiveAction";

export default function TreeArchive() {
  const [sharableChat, setSharableChat] = React.useState([]);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const updateDashboard = useSelector((state) => state.updateSlice.archive);
  const updates = useSelector((state) => state.updateSlice.state);
  const dashboardData = useSelector((state) => state.historySlice.chat_history);
  const loadingHistory = useSelector((state) => state.historySlice.loading);
  const errorHistory = useSelector((state) => state.historySlice.error);
  const dispatch = useDispatch();
  const chatid = useSelector((state) => state.chatSlice.get_chat);
  const [renameToggle, setRenameToggle] = React.useState(false);
  const [deleteToggle, setDeleteToggle] = React.useState(false);
  const [handleChat, setHandleChat] = React.useState({});
  const [shareToggle, setShareToggle] = React.useState(false);

  // Get archive data
  React.useEffect(() => {
    console.log("update");
    dispatch(getHistoryAction({ token }));
  }, [updates, updateDashboard, token]);

  // Handle chat selection
  const handleGetChat = (chat_id, share_name) => {
    if (chatid !== chat_id) {
      dispatch(choseChate(chat_id));
      dispatch(loading_main_chat(true));
      dispatch(loading_get_chat_history(true));
      sessionStorage.setItem("chat", chat_id);
      sessionStorage.setItem("hints", false);
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 200, maxHeight: 500, overflow: "auto" }}>
        <TreeView>
          {dashboardData?.chat_history &&
          Object.entries(dashboardData.chat_history).length >= 1 ? (
            Object.entries(dashboardData.chat_history).map(
              (item, outerIndex) => (
                <TreeItem
                  itemId={`data-grid-${outerIndex}`}
                  label={item[0]}
                  key={outerIndex}
                >
                  {item[1] &&
                    Object.entries(item[1]).map((innerItem, innerIndex) => (
                      <TreeItem
                        onClick={() =>
                          handleGetChat(
                            innerItem[1].id,
                            innerItem[1].share_name
                          )
                        }
                        className={`${
                          innerItem[1].id === chatid && "bg-slate-300"
                        }`}
                        key={innerIndex}
                        itemId={`grid-community-${outerIndex}-${innerIndex}`} // Unique ID
                        label={
                          <div className="flex justify-between">
                            <div>{innerItem[1].name}</div>
                            <ArchiveSettings
                              item={innerItem[1]}
                              setRenameToggle={setRenameToggle}
                              setDeleteToggle={setDeleteToggle}
                              setHandleChat={setHandleChat}
                              setShareToggle={setShareToggle}
                            />
                          </div>
                        }
                      />
                    ))}
                </TreeItem>
              )
            )
          ) : loadingHistory ||
            typeof dashboardData?.chat_history === "undefined" ||
            loadingHistory ? (
            <>
              {errorHistory ? (
                <div className="text-center">
                  <img
                    src={loadingImg.src}
                    alt="loading"
                    className="w-20 loading_logo inline"
                  />
                  <div className="font-semibold">Loading..</div>
                </div>
              ) : (
                <div className="h-full w-full text-black flex justify-center items-center">
                  <div className="text-center">
                    <img className="w-20 inline" src={Logo.src} alt="logo" />
                    <div className="font-semibold">No History Yet</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            dashboardData.chat_history &&
            Object.entries(dashboardData.chat_history).length === 0 && (
              <div className="h-full w-full text-black flex justify-center items-center">
                <div className="text-center">
                  <img className="w-20 inline" src={Logo.src} alt="logo" />
                  <div className="font-semibold">No History Yet</div>
                </div>
              </div>
            )
          )}
        </TreeView>
      </Box>

      <ArchiveAction
        setSharableChat={setSharableChat}
        sharableChat={sharableChat}
        setShareToggle={setShareToggle}
        setRenameToggle={setRenameToggle}
        token={token}
        shareToggle={shareToggle}
        renameToggle={renameToggle}
        deleteToggle={deleteToggle}
        handleChat={handleChat}
        setHandleChat={setHandleChat}
      />
    </>
  );
}
