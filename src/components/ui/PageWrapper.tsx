import React from 'react'
import Loader from './Loader'

interface PageWrapperProps {
    loading?: boolean
    children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ loading = false, children }) => {
    return (
        <div className="page-wrapper">
            {loading ? <Loader /> : children}
        </div>
    )
}

export default PageWrapper
