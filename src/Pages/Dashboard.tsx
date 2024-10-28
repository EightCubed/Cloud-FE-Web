import { useEffect, useState } from "react";
import { Fetch } from "../../utils/fetch";
import { FileNode, TreeDirectoryResponse } from "./dashboard.types";
import classNames from "classnames/bind";
import styles from "./dashboard.module.css";
import BreadCrumbs from "../Reusable Components/BreadCrumbs";
import DirectoryTree from "../Reusable Components/DirectoryTree";
import PlusImage from "../assets/PlusImage";
import Modal from "../Reusable Components/Modal";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

const initTreeData: FileNode = {
  file: {
    filename: "",
    filetype: "file",
    absolutefilepath: "",
  },
  children: [],
  filepath: "",
  parentdirectory: "",
};

const Dashboard = () => {
  const [treeDirectory, setTreeDirectory] = useState<FileNode>(initTreeData);

  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);

  const [currentFolderParentPath, setCurrentFolderParentPath] =
    useState<string>("./uploads");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const postAddDirectory = async (filePath: string) => {
    const res = await Fetch<TreeDirectoryResponse>({
      apiRoutes: "createDirectory",
      method: "post",
      data: {
        directory: filePath,
      },
    });
    console.log(res);
  };

  const handleFolderAddClick = () => {
    postAddDirectory(currentFolderParentPath + "/random_name_6");
    fetchTreeDirectory(currentFolderParentPath);
  };

  const handleNavigateBack = (parentFilePath: string) => {
    setCurrentFolderParentPath(parentFilePath);
    console.log("parentFilePath", parentFilePath);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // console.log("currentFolderParentPath: ", currentFolderParentPath);

  // console.log(treeDirectory);

  console.log(isModalOpen);

  return (
    <div className={cx("dashboardContainer")}>
      {treeDirectory.children === null && <div>Empty!</div>}
      <div onClick={() => handleNavigateBack(treeDirectory.parentdirectory)}>
        Back
      </div>
      <div className={cx("addDocuments")}>
        <Button
          variant="contained"
          className={cx("fileAdd")}
          onClick={handleModalOpen}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>File</div>
        </Button>
        <Button
          variant="contained"
          className={cx("folderAdd")}
          onClick={handleFolderAddClick}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>Folder</div>
        </Button>
      </div>
      <Modal handleModalClose={handleModalClose} isOpen={isModalOpen}>
        <div>Modal Here!</div>
      </Modal>
      <div className={cx("breadCrumbsContainer")}>
        <BreadCrumbs
          path={breadCrumbs}
          // handleFolderClick={handleFolderClick}
        />
      </div>
      <div className={cx("mainArea")}>
        <DirectoryTree
          treeData={treeDirectory.children}
          handleFolderClick={handleFolderClick}
          currentFolderParentPath={currentFolderParentPath}
        />
      </div>
    </div>
  );
};

export default Dashboard;
