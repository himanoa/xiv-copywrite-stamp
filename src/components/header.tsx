import React from 'react'
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Colors } from '@blueprintjs/core'
interface Props {

}

export const Header = (props: Props) => {
  return (
    <Navbar style={{ background: Colors.DARK_GRAY4, color: Colors.WHITE }}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          FFXIVコピーライトジェネレーター
        </NavbarHeading>
      </NavbarGroup>
    </Navbar>
  )
}

