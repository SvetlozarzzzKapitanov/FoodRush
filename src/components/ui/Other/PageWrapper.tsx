import React from 'react'
import Loader from './Loader.tsx'
import "./PageWrapper.css"

interface PageWrapperProps {
    loading?: boolean
    children: React.ReactNode
    fallbackType?: 'restaurant-empty' | 'restaurant-error' | null
}

const PageWrapper: React.FC<PageWrapperProps> = ({loading = false, children, fallbackType = null
    }) => {
    return (
        <div className="page-wrapper">
            {loading ? (
                <Loader />
            ) : fallbackType === 'restaurant-empty' ? (
                <div className="restaurant-fallback-card">
                    <p>😔 Sorry for the inconvenience, but we currently have no restaurants available.</p>
                </div>
            ) : fallbackType === 'restaurant-error' ? (
                <div className="restaurant-fallback-card">
                    <p>⚠️ Failed to load restaurants. Please try again later.</p>
                </div>
            ) : (
                children
            )}
        </div>
    )
}

export default PageWrapper
