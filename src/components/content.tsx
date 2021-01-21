import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Previewer } from "./previewer";
import { PropertyEditor } from "./property-editor";
import { ImageParams } from "../image";
import { createNanoEvents, DefaultEvents, Emitter } from "nanoevents";
import { Instructions } from "./instructions";
import { Divider } from "@blueprintjs/core";

const ContentInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  div {
    padding: 4px;
  }

  .preview {
    width: 70vw;
    min-height: 500px;
    max-height: 1080px;
  }

  .property-editor {
    width: 30vw;
    * {
      height: auto;
    }
  }
`;

let listener: Emitter<DefaultEvents> | null = null;
const eventListener = (): Emitter<DefaultEvents> => {
  if (listener === null) {
    return (listener = createNanoEvents());
  }
  return listener;
};
export const Content = () => {
  const [imageParams, setImageParams] = useState<ImageParams | null>(null);

  const onUploaded = useCallback(
    (imageParams: ImageParams) => {
      setImageParams(imageParams);
    },
    [setImageParams]
  );

  const emit = useCallback(
    (e: any) => {
      eventListener().emit("ChangeCopyrightPosition", e);
    },
    [eventListener]
  );

  const listen = useMemo(() => {
    const listener = eventListener();
    return listener.on.bind(listener, "ChangeCopyrightPosition");
  }, [eventListener]);

  return (
    <ContentInner>
      <div className="preview">
        <Previewer
          onUploaded={onUploaded}
          imageParams={imageParams}
          listen={listen}
        />
      </div>
      <div className="property-editor">
        <Instructions />
        <Divider />
        <PropertyEditor emit={emit} />
      </div>
    </ContentInner>
  );
};
