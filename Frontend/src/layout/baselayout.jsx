import './baselayout.scss'

const BaseLayout = ({ children }) => {
    return (
        <div className='base'>
            <div className='body'>
                {children}
            </div>
        </div>

    )
}

export default BaseLayout;