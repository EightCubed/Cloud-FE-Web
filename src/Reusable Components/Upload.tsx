import UploadIcon from "../assets/UploadIcon";

interface UploadProps {
  file: unknown;
}

const Upload = ({ file }: UploadProps) => {
  //   const handleFileUpload = () => {
  //     if (selectedFile) {
  //       // Calculate the number of chunks and the size of each chunk
  //       const fileSize = selectedFile.size;
  //       const chunkSize = 1024 * 1024; // Set chunk size to 1MB
  //       const totalChunks = Math.ceil(fileSize / chunkSize);

  //       // Create a FormData object and add file information
  //       const formData = new FormData();
  //       formData.append("file", selectedFile);
  //       formData.append("totalChunks", totalChunks);

  //       // Loop through and upload chunks
  //       for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
  //         const start = chunkNumber * chunkSize;
  //         const end = Math.min(start + chunkSize, fileSize);
  //         const chunk = selectedFile.slice(start, end);
  //         formData.append(`chunk-${chunkNumber}`, chunk, selectedFile.name);
  //       }

  //       // Make a file upload request
  //       axios
  //         .post("/upload", formData, {
  //           onUploadProgress: (progressEvent) => {
  //             const progress = Math.round(
  //               (progressEvent.loaded / progressEvent.total) * 100,
  //             );
  //             setProgress(progress);
  //           },
  //         })
  //         .then((response) => {
  //           console.log("File upload successful:", response.data);
  //         })
  //         .catch((error) => {
  //           console.error("File upload failed:", error);
  //         });
  //     }
  //   };

  return (
    <>
      Upload
      <div>
        <UploadIcon />
      </div>
    </>
  );
};

export default Upload;
