interface BreadCrumbsProps {
  path: string[];
  //   handleFolderClick: () => void;
}

const BreadCrumbs = ({ path }: BreadCrumbsProps) => {
  const handleOnClick = () => {
    // handleFolderClick();
  };

  return (
    <div>
      {path.map((data) => {
        return (
          <div onClick={handleOnClick}>
            {data}
            <span>{">"}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
