import React, { useRef, useEffect } from "react";
import { ImageParams } from "../image";
import styled from "styled-components";
import { createCanvasImagePreviewPresenter } from "../canvas-image-preview-presenter";

const PreviewInner = styled.div`
  max-width: 100%;
  max-height: 1080px;
  overflow: scroll;
  span {
    visibility: hidden;
    white-space: nowrap;
  }
`;

interface Props {
  imageParams: ImageParams;
  listen: (cb: (e: any) => void) => void;
}

const COPYRIGHT = "(C) 2010 SQUARE ENIX CO., LTD. All Rights Reserved.";

export const Preview = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyrightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const canvasImagePreviewPresenter = createCanvasImagePreviewPresenter(
      canvasRef.current,
      copyrightRef.current,
      props.imageParams.dataUrl
    );

    canvasImagePreviewPresenter.drawCopyright();

    props.listen((e) => {
      canvasImagePreviewPresenter?.drawCopyright(e);
    });
  }, [canvasRef.current, copyrightRef.current]);

  return (
    <PreviewInner>
      <canvas ref={canvasRef}></canvas>
      <div>
        <span ref={copyrightRef}>{COPYRIGHT}</span>
      </div>
    </PreviewInner>
  );
};
