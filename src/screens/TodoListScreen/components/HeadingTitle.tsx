import {WuHeading} from '@npm-questionpro/wick-ui-lib'

interface IProps {
  title: string
}

export const HeadingTitle: React.FC<IProps> = ({title}) => {
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
}
