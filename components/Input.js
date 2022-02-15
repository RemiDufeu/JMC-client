import React from 'react'

const Input = ({name,value,required = true,onChange, disabled=false, type='text'}) => {
    return (
        <div className='input'>
           <div>{name}</div>
           <input value={value} name={name} required={required} type={type} onChange={onChange} disabled={disabled}></input>
        </div>
    )
}

export default Input
