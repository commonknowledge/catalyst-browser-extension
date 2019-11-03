/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from 'react'
import { PopupFrame } from 'popup/components'

const Popup: React.FC = () => {
  return (
    <PopupFrame>
      Hello, world.
    </PopupFrame>
  )
}

export default Popup;
