import {WuAppHeader} from '@npm-questionpro/wick-ui-lib'
import type {FC} from 'react'
import {Outlet} from 'react-router'

interface IProps {
  productName: string
}

export const Navbar: FC<IProps> = ({productName}) => {
  return (
    <>
      <WuAppHeader productName={productName} categories={[]} />
      <Outlet />
    </>
  )
}
