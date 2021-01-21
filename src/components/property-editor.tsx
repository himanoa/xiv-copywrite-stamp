import React, { FormEventHandler, useCallback, useState } from 'react'
import { RadioGroup, Radio } from '@blueprintjs/core'
import { Position, ChangeCopyrightPositionListener, isPosition } from '../event'

interface Props {
  emit: ChangeCopyrightPositionListener
}

interface CopyrightPositionRadioGroupProps {
  value: Position | undefined
  onCopyrightConfigChange: React.FormEventHandler<HTMLInputElement> 
}

export const CopyrightPositionRadioGroup = (props: CopyrightPositionRadioGroupProps) => {
  return (
    <RadioGroup label="コピーライトの位置" onChange={props.onCopyrightConfigChange} selectedValue={props.value}>
      <Radio label="左上" value="upper-left"/>
      <Radio label="左下" value="lower-left"/>
      <Radio label="右上" value="upper-right"/>
      <Radio label="右下" value="lower-right"/>
    </RadioGroup>
  )
}


type FormState = {
  fontSize: number,
  position: Position | undefined
}
export const PropertyEditor = (props: Props) => {
  const [formState, setFormState] = useState<FormState>({
    fontSize: 14,
    position: undefined
  })

  const onCopyrightPositionChange = useCallback<React.FormEventHandler<HTMLInputElement>>((e: React.ChangeEvent<HTMLInputElement>) => {
    if(isPosition(e.target.value)) {
      const newState = {...formState, position: e.target.value}
      props.emit(newState)
      setFormState(newState)
    }
  }, [formState, setFormState, props.emit])

  return (
    <form>
      <CopyrightPositionRadioGroup onCopyrightConfigChange={onCopyrightPositionChange} value={formState.position}/>
    </form>
  )
}
