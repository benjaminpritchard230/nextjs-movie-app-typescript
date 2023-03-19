import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/HomePage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const HomePage = () => {
  const { searchText, newSearch } = useSearchText();

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/movies?searchText=${searchText}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["item1"]}>
          <div className={styles["search"]}>
            <h2>Search now for movies, TV shows or people...</h2>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={"input-container"}>
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => {
                    newSearch(e.target.value);
                  }}
                />
                <button className="button" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular movies</h2>
        </Link>
        <Link href="/tv-shows/popular/" className={styles["item3"]}>
          <h2>Popular TV shows</h2>
        </Link>
        <Link href="/people/popular/" className={styles["item4"]}>
          <h2>Popular people</h2>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
