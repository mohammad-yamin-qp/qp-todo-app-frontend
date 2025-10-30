import {WuInput, WuSelect} from '@npm-questionpro/wick-ui-lib'
import {TODO_TYPE} from '../constants/todoTypeConstants'

interface IProps {
  onSearch: (query: string) => void
  onSelect: (
    value: {label: string; value: string} | {label: string; value: string}[],
  ) => void
}

export const FilterBar: React.FC<IProps> = ({onSearch, onSelect}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <WuInput
        type="text"
        Icon={<span className="wm-search"></span>}
        iconPosition="right"
        onChange={e => onSearch(e.target.value)}
        placeholder="Search"
      />
      <WuSelect
        aria-label="Select Todo Type"
        data={TODO_TYPE}
        accessorKey={{label: 'label', value: 'value'}}
        placeholder="Filter"
        onSelect={onSelect}
        defaultValue={{label: 'All', value: 'all'}}
      />
    </div>
  )
}
