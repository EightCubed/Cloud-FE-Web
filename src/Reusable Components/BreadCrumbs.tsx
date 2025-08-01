import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { BreadCrumbType } from "../Pages/dashboard.types";

interface BreadCrumbsProps {
  path: BreadCrumbType[];
  handleBreadCrumbClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function ActiveLastBreadcrumb({
  path,
  handleBreadCrumbClick,
}: BreadCrumbsProps) {
  function handleClick(
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: BreadCrumbType,
  ) {
    handleBreadCrumbClick(element.relativePath);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {path.map((element, idx) => {
        return (
          <div
            key={element.relativePath}
            role=""
            onClick={(e) => handleClick(e, element)}
          >
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
