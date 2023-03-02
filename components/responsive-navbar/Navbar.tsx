import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCaretDown } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { TiTimesOutline } from "react-icons/ti";
import Dropdown from "./Dropdown";

type Props = {};

const Navbar = (props: Props) => {
  const [click, setClick] = useState(false);
  const [movieDropdown, setMovieDropdown] = useState(false);
  const [tvDropdown, setTvDropdown] = useState(false);
  const [peopleDropdown, setPeopleDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnterMovie = () => {
    if (window.innerWidth < 960) {
      setMovieDropdown(false);
    } else {
      setMovieDropdown(true);
    }
  };

  const onMouseLeaveMovie = () => {
    if (window.innerWidth < 960) {
      setMovieDropdown(false);
    } else {
      setMovieDropdown(false);
    }
  };
  const onMouseEnterTv = () => {
    if (window.innerWidth < 960) {
      setTvDropdown(false);
    } else {
      setTvDropdown(true);
    }
  };

  const onMouseLeaveTv = () => {
    if (window.innerWidth < 960) {
      setTvDropdown(false);
    } else {
      setTvDropdown(false);
    }
  };
  const onMouseEnterPeople = () => {
    if (window.innerWidth < 960) {
      setPeopleDropdown(false);
    } else {
      setPeopleDropdown(true);
    }
  };

  const onMouseLeavePeople = () => {
    if (window.innerWidth < 960) {
      setPeopleDropdown(false);
    } else {
      setPeopleDropdown(false);
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
      path: "/tv-shows/airing-today/",
    },
    {
      title: "On TV",
      path: "/tv-shows/on-tv/",
    },
    {
      title: "Top rated",
      path: "/tv-shows/top-rated/",
    },
  ];

  const peopleMenuItems = [
    {
      title: "Popular",
      path: "/people/popular/",
    },
  ];

  return (
    <>
      <nav className={styles["navbar"]}>
        <Link
          href="/"
          className={styles["navbar-logo"]}
          onClick={closeMobileMenu}
        >
          <MdLocalMovies className={styles["title-logo"]} />
          Movie App
        </Link>

        <div className={styles["menu-icon"]} onClick={handleClick}>
          {click ? (
            <TiTimesOutline style={{ color: "white" }} />
          ) : (
            <AiOutlineMenu style={{ color: "white" }} />
          )}
        </div>
        <ul className={click ? styles["nav-menu-active"] : styles["nav-menu"]}>
          <li
            className={styles["nav-item"]}
            onMouseEnter={onMouseEnterMovie}
            onMouseLeave={onMouseLeaveMovie}
          >
            <Link
              href="/movies"
              className={styles["nav-links"]}
              onClick={closeMobileMenu}
            >
              Movies <BsCaretDown className={styles["icon"]} />
            </Link>

            {movieDropdown && <Dropdown menuItems={movieMenuItems} />}
          </li>
          <li
            className={styles["nav-item"]}
            onMouseEnter={onMouseEnterTv}
            onMouseLeave={onMouseLeaveTv}
          >
            <Link
              href="/tv-shows/"
              className={styles["nav-links"]}
              onClick={closeMobileMenu}
            >
              TV Shows <BsCaretDown className={styles["icon"]} />
            </Link>

            {tvDropdown && <Dropdown menuItems={tvMenuItems} />}
          </li>
          <li
            className={styles["nav-item"]}
            onMouseEnter={onMouseEnterPeople}
            onMouseLeave={onMouseLeavePeople}
          >
            <Link
              href="/people/"
              className={styles["nav-links"]}
              onClick={closeMobileMenu}
            >
              People <BsCaretDown className={styles["icon"]} />
            </Link>

            {peopleDropdown && <Dropdown menuItems={peopleMenuItems} />}
          </li>

          <li className={styles["nav-item"]}>
            <Link href="/about/" className={styles["nav-links"]}>
              <span onClick={closeMobileMenu}>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
