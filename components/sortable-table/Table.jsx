import styles from "@/styles/SortableTable.module.scss";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "./useSortableTable";

const Table = ({ data, columns, caption }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <div className={styles["caption-container"]}>
        <h4>{caption}</h4>
      </div>

      <div className={styles["table-container"]}>
        <table className={styles["table"]}>
          <TableHead {...{ columns, handleSorting }} />
          <TableBody {...{ columns, tableData }} />
        </table>
      </div>
    </>
  );
};

export default Table;
