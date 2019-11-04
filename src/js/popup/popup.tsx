/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from 'react'
import { PopupFrame } from 'common/components'
import { Theme } from 'common/theme';

const Popup: React.FC = () => {
  return (
    <Theme>
      <PopupFrame>
        Hello, world.
      </PopupFrame>
    </Theme>
  )
}

export default Popup;
