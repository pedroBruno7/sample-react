import { Link } from "gatsby";
import React from "react";
import styles from "./Footer.module.css";
import links from "../../../global_data/links_footer";

const Footer = ({ }) => {

  return (
    <div className={styles["container"]}>    
      <ul className={styles["list"]}>
        {links && links.map((link)=>{
          return (
            <li key={link.label} className={styles["link"]}>
              <Link
                to={link.path}
                className={styles["anchor"]}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Footer;
