import { useEffect, useState } from "react";
import { Fetch } from "../../utils/fetch";
import { TreeDirectoryResponse } from "./dashboard.types";
import File from "../Reusable Components/File";
import Folder from "../Reusable Components/Folder";

const initTreeData: TreeDirectoryResponse = {
  data: {
    file: {
      filename: "",
      filetype: "file",
    },
    adjacent: [],
  },
  message: "",
};

const Dashboard = () => {
  const [treeDirectory, setTreeDirectory] =
    useState<TreeDirectoryResponse>(initTreeData);

  const fetchTreeDirectory = async () => {
    const res = await Fetch<TreeDirectoryResponse>({
      apiRoutes: "showTreeDirectory",
      method: "get",
    });
    console.log(res.data.file.filetype);
    setTreeDirectory(res);
  };

  useEffect(() => {
    fetchTreeDirectory();
  }, []);
  return (
    <div>
      {treeDirectory.data.adjacent.map((entry) => {
        if (entry.file.filetype === "file") {
          return <File />;
        } else return <Folder />;
      })}
    </div>
  );
};

export default Dashboard;
