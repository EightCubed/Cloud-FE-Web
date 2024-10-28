import FolderImage from "../assets/FolderImage";
import { FileInfo } from "../Pages/dashboard.types";
import styles from "./file_folder.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface FolderDataProps {
  folderData: FileInfo;
}

const Folder = ({ folderData }: FolderDataProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("fileIconSVG")}>
        <FolderImage />
      </div>
      <div className={cx("text")}>{folderData.filename}</div>
    </div>
  );
};

export default Folder;
