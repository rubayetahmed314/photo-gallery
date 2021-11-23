import React from 'react';

const Loading = () => {
    return (
        <div className='row'>
            <div className='col-12' style={{ padding: '60px' }}>
                <span className='fa fa-spinner fa-5x fa-fw fa-pulse'></span>
            </div>
        </div>
    );
};

export default Loading;
