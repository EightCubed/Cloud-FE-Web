import { useEffect, useState } from "react";
import { Fetch } from "../../utils/fetch";
import {
  BreadCrumbType,
  DeleteHandlerResponse,
  FileNode,
  TreeDirectoryResponse,
  UploadHandlerResponse,
} from "./dashboard.types";
import classNames from "classnames/bind";
import styles from "./dashboard.module.css";
import BreadCrumbs from "../Reusable Components/BreadCrumbs";
import DirectoryTree from "../Reusable Components/DirectoryTree";
import PlusImage from "../assets/PlusImage";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast, Toaster } from "sonner";
import { Delete } from "@mui/icons-material";

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
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbType[]>([]);
  const [currentFolderParentPath, setCurrentFolderParentPath] =
    useState<string>("./uploads");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  const [isDeletionModeEnabled, setIsDeletionModeEnabled] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState<FileNode[]>(
    [],
  );

  const [folderName, setFolderName] = useState("");

  const fetchTreeDirectory = async (path: string) => {
    try {
      const res = await Fetch<TreeDirectoryResponse>({
        apiRoutes: "listFiles",
        method: "get",
        fileName: path,
      });
      setTreeDirectory(res.data);
      setBreadCrumbs(res.path);
    } catch (err) {
      console.error("Error fetching directory:", err);
    }
  };

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList: File[] = Array.from(files);
    for (const file of fileList) {
      if (file.name === ".DS_Store" || file.name.startsWith("._")) continue;
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "path",
        currentFolderParentPath +
          "/" +
          file.webkitRelativePath.replace(`/${file.name}`, ""),
      );
      formData.append("filename", file.name);

      const toastId = toast.loading(`Uploading ${file.name}...`);

      try {
        await Fetch<UploadHandlerResponse>({
          apiRoutes: "upload",
          method: "post",
          data: formData,
          multipartFormData: true,
        });
        toast.success(`✅ Uploaded: ${file.name}`, { id: toastId });
        fetchTreeDirectory(currentFolderParentPath);
      } catch (err) {
        toast.error(`Something went wrong: ${err}`, { id: toastId });
        console.error("Error creating directory:", err);
      }
    }
  };

  useEffect(() => {
    fetchTreeDirectory(currentFolderParentPath);
    handleDeletionModeDisabled();
    setSelectedForDeletion([]);
  }, [currentFolderParentPath]);

  const handleFolderClick = (folder: FileNode) => {
    setCurrentFolderParentPath(folder.file.absolutefilepath);
  };

  const postAddDirectory = async (filePath: string) => {
    try {
      const res = await Fetch<TreeDirectoryResponse>({
        apiRoutes: "createDirectory",
        method: "post",
        data: {
          directory: filePath,
        },
      });
      toast.success(`Created folder : ${res.path}`);
      fetchTreeDirectory(currentFolderParentPath);
    } catch (err) {
      toast.error(`Something went wrong: ${err}`);
      console.error("Error creating directory:", err);
    }
  };

  const handleFolderAddClick = () => {
    postAddDirectory(currentFolderParentPath + "/" + folderName);
    fetchTreeDirectory(currentFolderParentPath).then(() => {
      setIsCreateFolderModalOpen(false);
    });
  };

  const handleDeleteConfirmation = async () => {
    try {
      const res = await Fetch<DeleteHandlerResponse>({
        method: "delete",
        apiRoutes: "delete",
        data: { filesToBeDeleted: selectedForDeletion },
        fileName: currentFolderParentPath,
      });
      fetchTreeDirectory(currentFolderParentPath);
      if (res.failure_count > 0) {
        toast.error(`Success: ${res.success_count} Fail: ${res.failure_count}`);
        toast.error(`Failure : ${res.message}`);
      } else {
        toast.success(`Success : ${res.message}`);
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`);
      console.error("Error creating directory:", err);
    }
    handleDeletionModeDisabled();
    setSelectedForDeletion([]);
  };

  const handleNavigateBack = (parentFilePath: string) => {
    setCurrentFolderParentPath(parentFilePath);
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadModalOpen = () => {
    setIsUploadModalOpen(true);
  };

  const handleCreateFolderModalClose = () => {
    setIsCreateFolderModalOpen(false);
  };

  const handleCreateFolderModalOpen = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleToggleDeletionMode = () => {
    if (isDeletionModeEnabled) {
      handleDeletionModeDisabled();
    } else handleDeletionModeEnabled();
  };

  const handleDeletionModeEnabled = () => {
    setIsDeletionModeEnabled(true);
  };

  const handleDeletionModeDisabled = () => {
    setIsDeletionModeEnabled(false);
  };

  return (
    <div className={cx("dashboardContainer")}>
      {treeDirectory.children === null && <div>Empty!</div>}
      <Toaster richColors position="top-right" />
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
          onClick={handleUploadModalOpen}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>Upload</div>
        </Button>
        <Button
          variant="contained"
          className={cx("folderAdd")}
          onClick={handleCreateFolderModalOpen}
        >
          <div className={cx("plusIcon")}>
            <PlusImage />
          </div>
          <div className={cx("plusText")}>Create Folder</div>
        </Button>
        <Button
          variant="contained"
          className={cx("folderAdd")}
          onClick={handleToggleDeletionMode}
          color="error"
        >
          <div className={cx("deleteIcon")}>
            <Delete />
          </div>
          <div className={cx("plusText")}>
            {isDeletionModeEnabled ? "Cancel" : "Delete"}
          </div>
        </Button>
        {isDeletionModeEnabled && (
          <Button
            variant="contained"
            className={cx("folderAdd")}
            onClick={handleDeleteConfirmation}
            color="warning"
          >
            <div className={cx("deleteIcon")}>
              <Delete />
            </div>
            <div className={cx("plusText")}>Confirm Deletion</div>
          </Button>
        )}
      </div>
      <Modal open={isUploadModalOpen} onClose={handleUploadModalClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            File Upload
          </Typography>
          <Typography sx={{ mt: 2, mb: 10 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <input
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleUploadFiles}
              />
            </Button>
          </Typography>
          <Typography variant="h6" component="h2">
            Folder Upload
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload folder
              <input
                type="file"
                multiple
                ref={(ref) => {
                  if (ref) {
                    (
                      ref as HTMLInputElement & { webkitdirectory: boolean }
                    ).webkitdirectory = true;
                  }
                }}
                style={{ display: "none" }}
                onChange={handleUploadFiles}
              />
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={isCreateFolderModalOpen}
        onClose={handleCreateFolderModalClose}
      >
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
        <BreadCrumbs path={breadCrumbs} handleFolderClick={handleFolderClick} />
      </div>
      <div className={cx("mainArea")}>
        <DirectoryTree
          treeData={treeDirectory.children}
          handleFolderClick={handleFolderClick}
          currentFolderParentPath={currentFolderParentPath}
          isDeletionModeEnabled={isDeletionModeEnabled}
          selectedForDeletion={selectedForDeletion}
          setSelectedForDeletion={setSelectedForDeletion}
        />
      </div>
    </div>
  );
};

export default Dashboard;
