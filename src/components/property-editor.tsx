import React, { useCallback, useState } from 'react'
import { RadioGroup, Radio, FormGroup, NumericInput } from '@blueprintjs/core'
import { ChangeCopyrightPositionListener } from '../event'
import { TextProperty, defaultProperty, Position, isPosition } from '../text-property'

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


interface FontSizeInputProps {
  value: number
  onChange: React.FormEventHandler<HTMLInputElement> 
}

export const FontSizeInput = (props: FontSizeInputProps) => {
  return (
    <FormGroup label="フォントサイズ" >

      <NumericInput defaultValue={props.value} onChange={props.onChange}/>
    </FormGroup>
  )
}


export const PropertyEditor = (props: Props) => {
  const [formState, setFormState] = useState<TextProperty>(defaultProperty())

  const onCopyrightPositionChange = useCallback<React.FormEventHandler<HTMLInputElement>>((e: React.ChangeEvent<HTMLInputElement>) => {
    if(isPosition(e.target.value)) {
      const newState = {...formState, position: e.target.value}
      props.emit(newState)
      setFormState(newState)
    }
  }, [formState, setFormState, props.emit])


  const onFontSizeChange = useCallback<React.FormEventHandler<HTMLInputElement>>((e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {...formState, fontSize: parseInt(e.target.value, 10)}
    props.emit(newState)
    setFormState(newState)
  }, [formState, setFormState, props.emit])

  return (
    <form>
      <CopyrightPositionRadioGroup onCopyrightConfigChange={onCopyrightPositionChange} value={formState.position}/>
      <FontSizeInput onChange={onFontSizeChange} value={formState.fontSize} />
    </form>
  )
}
