/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from "react";

export const PopupFrame: React.FC = ({ children }) => (
  <div sx={{ width: 250 }}>{children}</div>
)

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: any;
}> = ({ checked, onChange, children }) => (
  <div>
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </label>
  </div>
);

export const Banner: React.FC = ({ children }) => (
  <div sx={{ border: '2px solid red', color: 'red.4', p: 3 }}>
    {children}
  </div>
)