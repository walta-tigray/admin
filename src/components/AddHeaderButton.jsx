import React from 'react'
import { useNavigate } from 'react-router-dom'
function AddHeaderButton({ link }) {

    const navigate = useNavigate();
    return (
        <button className='category__header_button' onClick={() => { navigate(link) }}>Add new</button>
    )
}

export default AddHeaderButton