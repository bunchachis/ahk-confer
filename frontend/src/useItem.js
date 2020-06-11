import {useState} from 'react'

const useItem = (list, setList, defaultItem, match) => {
  const [item, setItem] = useState(defaultItem)
  const find = template => list.find(item => match(item, template))
  const reset = () => setItem({...defaultItem})
  const apply = value => {
    const usedValue = value || item
    let found = false
    const items = list.map(i => {
      if (match(i, usedValue)) {
        found = true
        return usedValue
      } else {
        return i
      }
    })
    if (!found) items.push({...usedValue})
    setList(items)
    setItem(usedValue)
  }
  const remove = template => {
    const items = list.filter(r => !match(r, template || item))
    setList(items)
    if (!template || match(template, item)) reset()
  }

  return {item, setItem, find, reset, apply, remove}
}

export default useItem