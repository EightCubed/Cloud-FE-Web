import classNames from "classnames/bind";
import { FileNode } from "../Pages/dashboard.types";
import File from "./File";
import Folder from "./Folder";
import styles from "./directorytree.module.css";
import { Checkbox } from "@mui/material";

const cx = classNames.bind(styles);

interface DirectoryTreeProps {
  treeData: FileNode[];
  handleFolderClick: (file: FileNode) => void;
  currentFolderParentPath: string;
  isDeletionModeEnabled: boolean;
  selectedForDeletion: FileNode[];
  setSelectedForDeletion: React.Dispatch<React.SetStateAction<FileNode[]>>;
}

const DirectoryTree = ({
  treeData,
  handleFolderClick,
  isDeletionModeEnabled,
  selectedForDeletion,
  setSelectedForDeletion,
}: DirectoryTreeProps) => {
  const handleClick = (file: FileNode, isFile: boolean) => {
    if (isFile) return;
    handleFolderClick(file);
  };

  const handleCheckboxClick = (entry: FileNode) => {
    setSelectedForDeletion([...selectedForDeletion, entry]);
  };

  return (
    <div className={cx("gridContainer")}>
      {treeData.length !== 0 &&
        treeData.map((entry) => {
          const { filetype, absolutefilepath } = entry.file;
          const isFile = filetype === "file";
          return (
            <div key={entry.file.absolutefilepath} className={cx("gridItem")}>
              <div className={cx("checkbox-container")}>
                <div></div>
                {isDeletionModeEnabled && (
                  <Checkbox
                    className={cx("checkbox")}
                    onClick={() => handleCheckboxClick(entry)}
                  />
                )}
              </div>
              <div
                key={absolutefilepath}
                onClick={() => handleClick(entry, isFile)}
              >
                {isFile ? (
                  <File fileData={entry.file} />
                ) : (
                  <Folder folderData={entry.file} />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DirectoryTree;
