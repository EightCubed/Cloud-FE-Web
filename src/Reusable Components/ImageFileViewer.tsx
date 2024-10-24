import { BACKEND_URL } from "../../utils/fetch";

interface ImageFileProps {
  imageUrl: string;
}

const ImageViewer = ({ imageUrl }: ImageFileProps) => {
  return (
    <div>
      <h2>Image:</h2>
      <img
        src={BACKEND_URL + imageUrl}
        alt="File Preview"
        style={{ maxWidth: "100%" }}
      />{" "}
    </div>
  );
};

export default ImageViewer;
