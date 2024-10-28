import classNames from "classnames/bind";
import styles from "./modal.module.css";

const cx = classNames.bind(styles);

interface ModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  children: React.JSX.Element;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return;
  return <div className={cx("modalContainer")}>{children}</div>;
};

export default Modal;
