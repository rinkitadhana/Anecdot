import React, { ReactNode } from "react"
type Props = {
  children: ReactNode
}
const Screen: React.FC<Props> = ({ children }) => {
  return <div className="screen ">{children}</div>
}

export default Screen
