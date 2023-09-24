import React from 'react'

interface Props {
  children: React.ReactNode
}


export const Layout: React.FunctionComponent<Props> = (props) => {
  return (
    <div>{props.children}</div>
  )
}
