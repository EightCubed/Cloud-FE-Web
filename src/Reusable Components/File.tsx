import { useState } from "react";
import FileImage from "../assets/FileImage";
import { FileInfo } from "../Pages/dashboard.types";
import ImageViewer from "./ImageFileViewer";
import styles from "./file_folder.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface FileDataProps {
  fileData: FileInfo;
}

const File = ({ fileData }: FileDataProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    console.log(fileData);
  };

  return (
    <div className={cx("container")} onClick={handleClick}>
      {isSelected && <ImageViewer imageUrl={fileData.absolutefilepath} />}
      <div className={cx("fileIconSVG")}>
        <FileImage />
      </div>
      <div className={cx("text")}>{fileData.filename}</div>
    </div>
  );
};

export default File;
