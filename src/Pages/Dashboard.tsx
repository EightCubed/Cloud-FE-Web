import { useEffect, useState } from "react";
import { Fetch } from "../../utils/fetch";
import { FileNode, TreeDirectoryResponse } from "./dashboard.types";
import classNames from "classnames/bind";
import styles from "./dashboard.module.css";
import BreadCrumbs from "../Reusable Components/BreadCrumbs";
import DirectoryTree from "../Reusable Components/DirectoryTree";
import PlusImage from "../assets/PlusImage";

const cx = classNames.bind(styles);

const initTreeData: FileNode = {
  file: {
    filename: "",
    filetype: "file",
    absolutefilepath: "",
  },
  adjacent: [],
  filepath: "",
};

const Dashboard = () => {
  const [treeDirectory, setTreeDirectory] = useState<FileNode>(initTreeData);

  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);

  const [currentFolderParentPath, setCurrentFolderParentPath] =
    useState<string>("./uploads/");

  const fetchTreeDirectory = async (path: string) => {
    const res = await Fetch<TreeDirectoryResponse>({
      apiRoutes: "listFiles",
      method: "get",
      fileName: path,
    });
    setTreeDirectory(res.data);
    setBreadCrumbs(res.path);
  };

  useEffect(() => {
    fetchTreeDirectory(currentFolderParentPath);
  }, [currentFolderParentPath]);

  const handleFolderClick = (folder: FileNode) => {
    setCurrentFolderParentPath(folder.file.absolutefilepath);
  };

  console.log("currentFolderParentPath: ", currentFolderParentPath);

  return (
    <div className={cx("dashboardContainer")}>
      {treeDirectory.adjacent === null && <div>Empty!</div>}
      <div className={cx("addDocuments")}>
        <div className={cx("fileAdd")}>
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>File</div>
        </div>
        <div className={cx("folderAdd")}>
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>Folder</div>
        </div>
      </div>
      <div className={cx("mainArea")}>
        <div className={cx("breadCrumbsContainer")}>
          <BreadCrumbs
            path={breadCrumbs}
            // handleFolderClick={handleFolderClick}
          />
        </div>
        <DirectoryTree
          treeData={treeDirectory.adjacent}
          handleFolderClick={handleFolderClick}
          currentFolderParentPath={currentFolderParentPath}
        />
      </div>
    </div>
  );
};

export default Dashboard;
