import Header from "@/components/Header";
import styles from "@/styles/About.module.scss";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <>
      <Header text={"About"} />
      <div className={styles["container"]}>
        <div className={styles["item1"]}>
          <p>
            This website was created using Next.js and the themoviedb.org API.
            The styling was done with CSS/SCSS, the only exception being the
            image carousel which is from Core IO (coreui.io). CSS grid was used
            for the bulk of the page layouts, in addition to CSS flex box.
            Next.js CSS modules were used to separate the styling for each
            page/component and SCSS partials were used to make it easier to keep
            styling consistent across the website. The website allows users to
            search for movie titles, TV show titles or actors/crews names. The
            website is fully responsive and can be used on mobile, tablets and
            laptop/desktop screens. Typescript was used throughout this project
            which was particularly helpful when utilising the API data. The
            website{" "}
            <a href="https://transform.tools/json-to-typescript">
              https://transform.tools/json-to-typescript
            </a>{" "}
            was used to create Typescript interfaces from the API JSON data
            which made it easier to utilise the API data in the website.
            Typescript was helpful in ensuring that the correct props were
            passed between components. The website takes advantage of several
            Next.js features. Next.js routing is used to navigate between pages.
            Dynamic routes are used for the ‘info pages’ for movies, TV shows or
            people. Static paths are used to improve the loading speed of some
            pages, for example the pages for popular, now-playing, upcoming and
            top-rated movies. This improves the user experience by pre-rendering
            the pages which are most likely to be visited by the user. Fallback
            is set to blocking on the dynamic routes so that the user can still
            access information on less popular pages. Server side props are used
            for some pages, for example the movie cast page. The Next.js image
            component is used throughout the website to reduce the size of
            images, improving load times. As different movies/TV shows/people
            have different amounts of data available, conditional rendering was
            important on the info pages. This was achieved using ternary
            operators. Several functions were required to convert the JSON data
            into a user-accessible form. For example the language codes for
            movies were converted to language names using the built-in
            Javascript Intl.DisplayNames object. Next.js routing is also used
            for the search function of the website. When making a new search the
            user is directed to the search results page for movies and the
            search text is passed in the URL so that the data can be retrieved
            from the API. The user can then switch between movies, TV shows and
            people results. The React useContext hook is used to pass the search
            text between the three search results pages. Pagination is also
            enabled on the search results page, with each page showing 20
            results. The page number is passed in the URL.
          </p>
        </div>
        <div className={styles["item2"]}></div>
        <div className={styles["item3"]}></div>
      </div>
    </>
  );
};

export default AboutPage;
