
import React, { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import styles from "./DashboardNavbar.module.css";
import Avatar  from "../../../components/Elements/Avatar/Avatar";

const DashboardNavbar = ({ toggleSidebar }) => {

  const { userGlobalState } = useContext(UserContext);

  return (
    <div className={styles["container"]}>
      <div className={styles["question"]}> ? </div>
      <div className={styles["avatar__container"]}>
        <Avatar
          label={userGlobalState.user.first_name[0].toUpperCase() + userGlobalState.user.last_name[0].toUpperCase()}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;
