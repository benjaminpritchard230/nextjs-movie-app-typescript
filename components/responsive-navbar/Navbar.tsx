import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCaretDown } from "react-icons/bs";
import { TiTimesOutline } from "react-icons/ti";
import Dropdown from "./Dropdown";

type Props = {};

const Navbar = (props: Props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const movieMenuItems = [
    {
      title: "Popular",
      path: "/movies/popular/",
      cName: "dropdown-link",
    },
    {
      title: "Now playing",
      path: "/movies/now-playing/",
      cName: "dropdown-link",
    },
    {
      title: "Upcoming",
      path: "/movies/upcoming/",
      cName: "dropdown-link",
    },
    {
      title: "Top rated",
      path: "/movies/top-rated/",
      cName: "dropdown-link",
    },
  ];
  const tvMenuItems = [
    {
      title: "Popular",
      path: "/tv-shows/popular/",
    },
    {
      title: "Airing today",
      path: "/tv-shows/now-playing/",
    },
    {
      title: "On TV",
      path: "/tv-shows/upcoming/",
    },
    {
      title: "Top rated",
      path: "/tv-shows/top-rated/",
    },
  ];

  return (
    <>
      <nav className={styles["navbar"]}>
        <a href="/" className={styles["navbar-logo"]} onClick={closeMobileMenu}>
          Movie App
          <i className="fab fa-firstdraft" />
        </a>
        <div className={styles["menu-icon"]} onClick={handleClick}>
          {click ? (
            <TiTimesOutline style={{ color: "white" }} />
          ) : (
            <AiOutlineMenu style={{ color: "white" }} />
          )}
        </div>
        <ul className={click ? styles["nav-menu-active"] : styles["nav-menu"]}>
          <li className={styles["nav-item"]}>
            <Link href="/" className={styles["nav-links"]}>
              <span onClick={closeMobileMenu}>Home</span>
            </Link>
          </li>
          <li
            className={styles["nav-item"]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <a
              href="/movies"
              className={styles["nav-links"]}
              onClick={closeMobileMenu}
            >
              Movies <BsCaretDown className={styles["icon"]} />
            </a>
            {dropdown && <Dropdown menuItems={movieMenuItems} />}
          </li>
          <li
            className={styles["nav-item"]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <a
              href="/movies"
              className={styles["nav-links"]}
              onClick={closeMobileMenu}
            >
              TV Shows <BsCaretDown className={styles["icon"]} />
            </a>
            {dropdown && <Dropdown menuItems={tvMenuItems} />}
          </li>
          <li className={styles["nav-item"]}>
            <Link href="/people" className={styles["nav-links"]}>
              <span onClick={closeMobileMenu}>People</span>
            </Link>
          </li>

          <li>
            <a
              href="/sign-up"
              className={styles["nav-links-mobile"]}
              onClick={closeMobileMenu}
            >
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
