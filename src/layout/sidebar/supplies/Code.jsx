import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/style/sidebar.module.css";
import { set_code } from "@/app/Redux/Features/Code/CodeSlice";
import Loading from "@/components/loading/Loading";
import NoData from "@/components/Comments/NoData";

const Code = () => {
  const { storedCode, status, error, value: code } = useSelector((state) => state.codeSlice);
  const dispatch = useDispatch();

  // Handle checkbox changes
  const handleCheck = (id) => {
    if (storedCode.length < 5) {
      dispatch(set_code(id));
    }
  };

  const handleData = useMemo(() => {
    switch (status) {
      case 0:
        return <NoData />;
      case 1:
        return code.length > 0 ? (
          code.map((item, index) => (
            <div key={index}>
              <label htmlFor={item.id} className="bg-primary p-2 block">
                {item.name}
              </label>
              <input type="checkbox" id={item.id} className="hidden" />
              <div className="content text-primary sliders_container">
                {item.pdfs.length > 0
                  ? item.pdfs.map((item, index) => (
                      <div
                        onClick={() => handleCheck(item.id)}
                        key={index}
                        className={`slide ${
                          storedCode.includes(item.id) && "selected"
                        }`}
                        id={item.id}
                      >
                        <p>{item.name}</p>
                      </div>
                    ))
                  : <div className="text-center p-2">
                      <p>No Data Yet !</p>
                    </div>}
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
  }, [error, status, storedCode, code]);

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
          <input placeholder="Search" type="search" className="input text-white" />
        </div> */}
      </div>

      <div className={styles.body}>
        <div className="accordion">{handleData}</div>
      </div>
    </div>
  );
};

export default Code;
