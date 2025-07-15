import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { BreadCrumbType, FileInfo, FileNode } from "../Pages/dashboard.types";

interface BreadCrumbsProps {
  path: BreadCrumbType[];
  handleFolderClick: (folder: FileNode) => void;
}

export default function ActiveLastBreadcrumb({
  path,
  handleFolderClick,
}: BreadCrumbsProps) {
  function handleClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: BreadCrumbType,
  ) {
    event.preventDefault();

    const fileNode: FileNode = {
      file: {
        absolutefilepath: element.absolutePath,
      } as FileInfo,
      filepath: element.absolutePath,
      parentdirectory: "",
      children: [],
    };

    handleFolderClick(fileNode);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {path.map((element, idx) => {
        return (
          <div role="" onClick={(e) => handleClick(e, element)}>
            <Link underline="hover" color="inherit">
              <Typography
                sx={{ color: idx === path.length - 1 ? "text.primary" : "" }}
              >
                {element.title[0].toUpperCase() + element.title.slice(1)}
              </Typography>
            </Link>
          </div>
        );
      })}
    </Breadcrumbs>
  );
}
