import React from "react";
import { Uploader } from "./file-selector";
import { Preview } from "./preview";
import { ImageParams } from "../image";

interface Props {
  imageParams: ImageParams | null;
  onUploaded: (imageParams: ImageParams) => void;
  listen: (cb: (e: any) => void) => void;
}

export const Previewer = (props: Props) => {
  if (props.imageParams === null) {
    return <Uploader onUploaded={props.onUploaded} />;
  } else if (props.imageParams) {
    return <Preview imageParams={props.imageParams} listen={props.listen} />;
  }
  return <></>;
};
