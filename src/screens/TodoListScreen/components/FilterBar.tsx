import {WuInput, WuSelect} from '@npm-questionpro/wick-ui-lib'
import {memo, useState} from 'react'
import {useTodoStore} from '../../../store/todoStore'
import {TODO_TYPE} from '../constants/todoTypeConstants'

export const FilterBar = memo(() => {
  const [selectedType, setSelectedType] = useState<{
    label: string
    value: string
  }>(TODO_TYPE[0])

  const {setQuery, setType} = useTodoStore(state => state)

  const onSelect = (
    option: {label: string; value: string} | {label: string; value: string}[],
  ): void => {
    const selected = Array.isArray(option) ? option[0] : option
    setType(selected.value)
    setSelectedType(selected)
  }

  return (
    <>
      <WuInput
        type="text"
        Icon={<span className="wm-search"></span>}
        iconPosition="right"
        onChange={e => setQuery(e.target.value)}
        placeholder="Search"
      />
      <WuSelect
        aria-label="Select Todo Type"
        data={TODO_TYPE}
        accessorKey={{label: 'label', value: 'value'}}
        placeholder="Filter"
        onSelect={onSelect}
        value={selectedType as {label: string; value: string}}
      />
    </>
  )
})

FilterBar.displayName = 'FilterBar'
