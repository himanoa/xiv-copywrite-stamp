import React, { useCallback, useRef } from "react";
import { Icon, Label, Card } from "@blueprintjs/core";
import styled from "styled-components";
import { ImageParams } from "../image";

const UploaderInner = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 500px;

  *:first-child {
    margin-bottom: 8px;
  }

  input {
    visibility: hidden;
  }
`;

interface Props {
  onUploaded: (imageParams: ImageParams) => void;
}

export const Uploader = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef.current]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("loadend", (event) => {
          if (event.target?.result && typeof event.target.result === "string") {
            props.onUploaded({ dataUrl: event.target.result });
          }
        });
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <Card interactive={true} onClick={onClick}>
      <UploaderInner>
        <input
          type="file"
          name="picture"
          ref={fileInputRef}
          onChange={onChange}
        />
        <Icon icon="media" iconSize={32} />
        <Label>クリックして編集したいファイルを選択</Label>
      </UploaderInner>
    </Card>
  );
};
