import React from 'react';
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';

const PhotoItem = props => {
    // console.log(props);
    return (
        <div>
            <Card style={{ cursor: 'pointer' }} onClick={props.PhotoSelect}>
                <CardBody className='px-0 py-0'>
                    <CardImg
                        width='100%'
                        height='200vw'
                        alt='photo'
                        src={props.src}
                        style={{ opacity: '1', objectFit: 'cover' }}
                    />
                </CardBody>
                <CardFooter
                    className='bg-dark text-white text-center py-2'
                    style={{ textTransform: 'uppercase' }}
                >
                    <strong>{props.name}</strong>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PhotoItem;
