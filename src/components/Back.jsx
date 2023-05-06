import React from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Back({ link }) {
    return (
        <div className='back__to__categories__button'>
            <Link to={link}><ArrowBackIcon /></Link>
        </div>
    )
}

export default Back