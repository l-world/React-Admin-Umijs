import React from 'react'

const BaseLayout = ({children}) => {
    return (
        <div>
            <h1>头部</h1>
            <section>侧边栏</section>
            {children}
        </div>
    )
}

export default BaseLayout