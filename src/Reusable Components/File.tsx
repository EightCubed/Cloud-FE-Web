import { useState } from "react";
import FileImage from "../assets/FileImage";
import { FileInfo } from "../Pages/dashboard.types";
import ImageViewer from "./ImageFileViewer";
interface FileDataProps {
  fileData: FileInfo;
}

const File = ({ fileData }: FileDataProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    console.log(fileData);
  };

  return (
    <div onClick={handleClick}>
      {isSelected && <ImageViewer imageUrl={fileData.absolutefilepath} />}
      <FileImage />
      {fileData.filename}
    </div>
  );
};

export default File;
