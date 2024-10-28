import { useEffect, useState } from "react";
import { Fetch } from "../../utils/fetch";
import { FileNode, TreeDirectoryResponse } from "./dashboard.types";
import classNames from "classnames/bind";
import styles from "./dashboard.module.css";
import BreadCrumbs from "../Reusable Components/BreadCrumbs";
import DirectoryTree from "../Reusable Components/DirectoryTree";
import PlusImage from "../assets/PlusImage";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

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
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const [folderName, setFolderName] = useState("");

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
    postAddDirectory(currentFolderParentPath + "/" + folderName);
    fetchTreeDirectory(currentFolderParentPath).then(() => {
      setIsFolderModalOpen(false);
    });
  };

  const handleNavigateBack = (parentFilePath: string) => {
    setCurrentFolderParentPath(parentFilePath);
  };

  const handleFileModalClose = () => {
    setIsFileModalOpen(false);
  };

  const handleFileModalOpen = () => {
    setIsFileModalOpen(true);
  };

  const handleFolderModalClose = () => {
    setIsFolderModalOpen(false);
  };

  const handleFolderModalOpen = () => {
    setIsFolderModalOpen(true);
  };

  return (
    <div className={cx("dashboardContainer")}>
      {treeDirectory.children === null && <div>Empty!</div>}
      <Button
        onClick={() => handleNavigateBack(treeDirectory.parentdirectory)}
        variant="contained"
        color="primary"
      >
        <ArrowBackIcon />
      </Button>
      <div className={cx("addDocuments")}>
        <Button
          variant="contained"
          className={cx("fileAdd")}
          onClick={handleFileModalOpen}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>File</div>
        </Button>
        <Button
          variant="contained"
          className={cx("folderAdd")}
          onClick={handleFolderModalOpen}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>Folder</div>
        </Button>
      </div>
      <Modal open={isFileModalOpen} onClose={handleFileModalClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            File Upload
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Modal open={isFolderModalOpen} onClose={handleFolderModalClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Create Folder
          </Typography>
          <TextField
            margin="dense"
            label="Enter name of folder"
            variant="standard"
            value={folderName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFolderName(event.target.value);
            }}
          />
          <div className={cx("createFolderButton")}>
            <Button variant="contained" onClick={handleFolderAddClick}>
              Create
            </Button>
          </div>
        </Box>
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
