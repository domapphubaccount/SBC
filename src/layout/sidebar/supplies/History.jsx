import React, { useMemo } from "react";
import styles from "@/style/sidebar.module.css";
import Loading from "@/components/loading/Loading";
import NoData from "@/components/Comments/NoData";
import { useDispatch, useSelector } from "react-redux";
import { choseChate } from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";

const History = () => {
  const { status, error, history } = useSelector((state) => state.historySlice);
  const chat_history = Object.entries(history?.chat_history || []); // i need to convert the object to an array to map the data here
  const dispatch = useDispatch()


  const handleGetChat = (chat_id) => {
    localStorage.removeItem("code");
    dispatch(choseChate(chat_id));
    dispatch(loading_chat(true));
    localStorage.setItem("chat", chat_id);
  };

  const handleData = useMemo(() => {
    switch (status) {
      case 0:
        return <NoData />;
      case 1:
        return chat_history.length > 0 ? (
          chat_history.map((item, index) => (
            <div key={index}>
              <label htmlFor={item[0]} className="bg-primary p-2 block">
                {item[0]}
              </label>
              <input type="checkbox" id={item[0]} className="hidden text-white" />
              <div className="content text-primary sliders_container">
                {item[1].length > 0 ? (
                  item[1].map((item, index) => (
                    <div
                      onClick={() =>  handleGetChat(item.id)}
                      key={index}
                      className={`slide`}
                      id={item.id}
                    >
                      <div className="text-end">
                        <small className="border-b-2">
                          {new Date(item.created_at).toLocaleString()}
                        </small>
                      </div>
                      <p>{item.question}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-2">
                    <p>No Data Yet !</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <NoData />
        );
      case 2:
        return <Loading />;
      default:
        return "";
    }
  }, [error, status, chat_history]);

  return (
    <div>
      <div className="bg-primary p-3">
        {/* <div className={styles.search}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={styles.search_icon}
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input placeholder="Search" type="search" className="input" />
        </div> */}
      </div>

      <div className={styles.body}>
        <div className="accordion">{handleData}</div>
      </div>
    </div>
  );
};

export default History;
