import React, {useState} from 'react'
import {SelectType} from '../types/type'

const Select = ({name, options, chooseOption, selectedOption}: SelectType) => {
  const [active, setActive] = useState(false)

  const handleOptionClick = (option: string) => {
    chooseOption(option)
    setActive(false)
  }

  return (
    <div className="nav-form__label dropdown" onClick={() => setActive(!active)}>
      {name}
      <span className="selected-option">{selectedOption}</span>
      <ul className={active ? 'menu menu-open' : 'menu'}>
        {options.map(option => (
          <li
            key={option}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select