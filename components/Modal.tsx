import styles from "@/styles/Modal.module.css";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, setOpen }: Props) => {
  return (
    <>
      {isOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles["modal-box"]}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
