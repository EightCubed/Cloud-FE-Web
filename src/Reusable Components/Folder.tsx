import FolderImage from "../assets/FolderImage";
import { FileInfo } from "../Pages/dashboard.types";

interface FolderDataProps {
  folderData: FileInfo;
}

const Folder = ({ folderData }: FolderDataProps) => {
  return (
    <div>
      <FolderImage />
      {folderData.filename}
    </div>
  );
};

export default Folder;
