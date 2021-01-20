import React from 'react'
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Colors } from '@blueprintjs/core'

interface Props {

}

export const Footer = (props: Props) => {
  return (
    <Navbar>
      <NavbarGroup>
        <p>記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。 Copyright (C) 2010 SQUARE ENIX CO., LTD. All Rights Reserve  © 2021 HIMANOA </p>
      </NavbarGroup>
    </Navbar>
  )
}

