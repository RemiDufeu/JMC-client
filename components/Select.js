import React from 'react'

const Select = ({name,value,required = true,onChange, options, disabled=false}) => {
    return (
        <div className='input'>
           <div>{name}</div>
           <select value={value} onChange={onChange} required={required} disabled={disabled}>
               {options.map((option,index)=> {
                   return <option key={index} value={option}>{option}</option>
               })}
           </select>
        </div>
    )
}

export default Select