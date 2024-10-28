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
import { Typography } from "@mui/material";

interface BreadCrumbsProps {
  path: string[];
  //   handleFolderClick: () => void;
}

export default function ActiveLastBreadcrumb({ path }: BreadCrumbsProps) {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.log();
  }

  return (
    <div role="" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {path.map((element, idx) => {
          return (
            <Link underline="hover" color="inherit">
              <Typography
                sx={{ color: idx === path.length - 1 ? "text.primary" : "" }}
              >
                {element[0].toUpperCase() + element.slice(1)}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
