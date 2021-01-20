import React, { useCallback } from 'react'
import { RadioGroup, Radio } from '@blueprintjs/core'

interface Props {

}

export const PropertyEditor = (props: Props) => {
  const onCopyRightPositionChange = useCallback(() => {
    // TODO: implement
  }, [])
  return (
    <form>
      <RadioGroup label={"コピーライトの位置"} onChange={onCopyRightPositionChange}>
        <Radio label="左上" value="upper-left"/>
        <Radio label="左下" value="lower-left"/>
        <Radio label="右上" value="upper-right"/>
        <Radio label="右下" value="lower-right"/>
      </RadioGroup>
    </form>
  )
}
