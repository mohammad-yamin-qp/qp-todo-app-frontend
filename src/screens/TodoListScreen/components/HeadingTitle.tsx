import {WuHeading} from '@npm-questionpro/wick-ui-lib'
import {memo} from 'react'

interface IProps {
  title: string
}

export const HeadingTitle: React.FC<IProps> = memo(({title}) => {
  if (!title) {
    return (
      <WuHeading size="lg" className="!my-10 text-center">
        No Title
      </WuHeading>
    )
  }

  return (
    <WuHeading size="lg" className="!my-10 text-center">
      {title}
    </WuHeading>
  )
})

HeadingTitle.displayName = 'HeadingTitle'
