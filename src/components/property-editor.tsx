import React, { useCallback, useState } from 'react'
import { RadioGroup, Radio } from '@blueprintjs/core'
import { Position, changeCopyrightConfig, ChangeCopyrightPositionListener } from '../event'

interface Props {
  emit: ChangeCopyrightPositionListener
}

interface CopyrightPositionRadioGroupProps {
  onCopyrightConfigChange: (e: string) => void
}

export const CopyrightPositionRadioGroup = (props: CopyrightPositionRadioGroupProps) => {
  const [position, setPosition] = useState<Position | undefined>(undefined)

  const onChange = useCallback((v) => {
    setPosition(v.target.value)
    props.onCopyrightConfigChange(v.target.value)
  }, [setPosition, props.onCopyrightConfigChange])

  return (
    <RadioGroup label="コピーライトの位置" onChange={onChange} selectedValue={position}>
      <Radio label="左上" value="upper-left"/>
      <Radio label="左下" value="lower-left"/>
      <Radio label="右上" value="upper-right"/>
      <Radio label="右下" value="lower-right"/>
    </RadioGroup>
  )
}


export const PropertyEditor = (props: Props) => {
  const onCopyrightPositionChange = useCallback(changeCopyrightConfig({emit: props.emit}), [props.emit])

  return (
    <form>
      <CopyrightPositionRadioGroup onCopyrightConfigChange={onCopyrightPositionChange}/>
    </form>
  )
}
