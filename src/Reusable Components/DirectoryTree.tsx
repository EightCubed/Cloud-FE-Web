import classNames from "classnames/bind";
import { FileNode } from "../Pages/dashboard.types";
import File from "./File";
import Folder from "./Folder";
import styles from "./directorytree.module.css";

const cx = classNames.bind(styles);

interface DirectoryTreeProps {
  treeData: FileNode[];
  handleFolderClick: (file: FileNode) => void;
  currentFolderParentPath: string;
}

const DirectoryTree = ({
  treeData,
  handleFolderClick,
  currentFolderParentPath,
}: DirectoryTreeProps) => {
  const handleClick = (file: FileNode) => {
    handleFolderClick(file);
    console.log(currentFolderParentPath);
  };

  return (
    <div className={cx("directoryTreeContainer")}>
      {treeData.length !== 0 &&
        treeData.map((entry) => {
          if (entry.file.filetype === "file") {
            return (
              <div className={cx("fileContainer", "icon-space")}>
                <File fileData={entry.file} />
              </div>
            );
          } else
            return (
              <div
                onClick={() => handleClick(entry)}
                className={cx("folderContainer", "icon-space")}
              >
                <Folder folderData={entry.file} />
              </div>
            );
        })}
    </div>
  );
};

export default DirectoryTree;
