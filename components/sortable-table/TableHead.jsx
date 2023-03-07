import styles from "@/styles/SortableTable.module.scss";
import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const getSymbol = (cl) => {
    if (cl === "up") {
      return " ↑ ";
    } else if (cl === "down") {
      return " ↓ ";
    } else if ((cl = "default")) {
      return " ↕ ";
    } else {
      return "";
    }
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={styles[cl]}
            >
              {label}

              {getSymbol(cl)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
