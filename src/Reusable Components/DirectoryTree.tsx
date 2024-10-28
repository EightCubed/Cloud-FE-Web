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
  const handleClick = (file: FileNode, isFile: boolean) => {
    if (isFile) return;
    handleFolderClick(file);
    console.log(currentFolderParentPath);
  };

  return (
    <div className={cx("gridContainer")}>
      {treeData.length !== 0 &&
        treeData.map((entry) => {
          const { filetype, absolutefilepath } = entry.file;
          const isFile = filetype === "file";
          return (
            <div
              key={absolutefilepath}
              className={cx("gridItem")}
              onClick={() => handleClick(entry, isFile)}
            >
              {isFile ? (
                <File fileData={entry.file} />
              ) : (
                <Folder folderData={entry.file} />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DirectoryTree;
