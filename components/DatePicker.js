import React from 'react'

const DatePicker = ({name,value,required = true,onChange, disabled=false}) => {
    return (
        <div className='input'>
           <div>{name}</div>
           <input value={value} disabled={disabled} name={name} required={required} type="date" onChange={onChange}></input>
        </div>
    )
}

export default DatePicker
