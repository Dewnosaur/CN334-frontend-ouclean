import React from 'react'

const Breadcrumb = ({ crumbs }) => {
    return (
        <nav aria-label='breadcrumb' className='mt-5 mx-10'>
            <ol className='list-reset flex text-grey-dark'>
                {crumbs.map((crumb, index) => (
                    <li key={index} className='flex items-center'>
                        <a href={crumb.link} className='text-black hover:text-orange-400'>{crumb.name}</a>
                        {index < crumbs.length - 1 && <span className='mx-2'>/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb
