// const BreadCrumbs = ({ path }: BreadCrumbsProps) => {
//   const handleOnClick = () => {
//     // handleFolderClick();
//   };

//   return (
//     <div>
//       {path.map((data) => {
//         return (
//           <div key={data} onClick={handleOnClick}>
//             {data}
//             <span>{">"}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface BreadCrumbsProps {
  path: string[];
  //   handleFolderClick: () => void;
}

export default function ActiveLastBreadcrumb({ path }: BreadCrumbsProps) {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {path.map((element, idx) => {
          {
            console.log(idx, path.length - 1);
          }
          return (
            <Link
              underline="hover"
              color="inherit"
              aria-current={idx === path.length - 1 ? "page" : "false"}
            >
              {element[0].toUpperCase() + element.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
