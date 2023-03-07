import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import React, { useState } from "react";
type Props = {
  menuItems: {
    title: string;
    path: string;
  }[];
};

const Dropdown = ({ menuItems }: Props) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click ? styles["dropdown-menu-clicked"] : styles["dropdown-menu"]
        }
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={styles["dropdown-link"]} href={item.path}>
                <span onClick={() => setClick(false)}>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
