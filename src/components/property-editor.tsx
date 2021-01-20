import React, { useCallback } from 'react'
import { RadioGroup, Radio } from '@blueprintjs/core'

interface Props {

}

interface CopyrightPositionRadioGroupProps {
  onCopyrightPositionChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export const CopyrightPositionRadioGroup = (props: CopyrightPositionRadioGroupProps) => {
  return (
    <RadioGroup label={"コピーライトの位置"} onChange={props.onCopyrightPositionChange}>
      <Radio label="左上" value="upper-left"/>
      <Radio label="左下" value="lower-left"/>
      <Radio label="右上" value="upper-right"/>
      <Radio label="右下" value="lower-right"/>
    </RadioGroup>
  )
}

export const PropertyEditor = (props: Props) => {
  const onCopyrightPositionChange = useCallback((v) => {
    console.dir(v.target.value)
  }, [])
  return (
    <form>
      <CopyrightPositionRadioGroup onCopyrightPositionChange={onCopyrightPositionChange}/>
    </form>
  )
}
