import React, { useState } from "react";
import FileImage from "../assets/FileImage";
import { FileInfo } from "../Pages/dashboard.types";
import styles from "./file_folder.module.css";
import classNames from "classnames/bind";
import { Button, Modal, Typography } from "@mui/material";
import { BACKEND_URL } from "../../utils/fetch";
import CloseIcon from "@mui/icons-material/Close";
import FilePreview from "reactjs-file-preview";

const cx = classNames.bind(styles);

interface FileDataProps {
  fileData: FileInfo;
}

const File = ({ fileData }: FileDataProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileOpen = () => {
    setIsOpen(true);
  };

  const handleFileClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={cx("container")} onClick={handleFileOpen}>
      {isOpen && (
        <Modal
          open={true}
          onClose={(e: React.MouseEvent<HTMLElement>) => handleFileClose(e)}
        >
          <div className={cx("modalContainer")}>
            <div className={cx("buttonContainer")}>
              <div className={cx("emptyDiv")}></div>
              <Typography className={cx("fileName")}>
                {fileData.filename}
              </Typography>
              <Button onClick={handleFileClose} className={cx("closeButton")}>
                <CloseIcon />
              </Button>
            </div>
            <div className={cx("previewContainer")}>
              <FilePreview preview={BACKEND_URL + fileData.absolutefilepath} />
            </div>
          </div>
        </Modal>
      )}
      <div className={cx("fileIconSVG")}>
        <FileImage />
      </div>
      <div className={cx("text")}>{fileData.filename}</div>
    </div>
  );
};

export default File;
