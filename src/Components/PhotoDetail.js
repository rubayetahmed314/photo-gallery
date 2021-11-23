import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import LoadComments from './LoadComments';
import CommentForm from './CommentForm';
import ColoredHR from './ColoredHR';

const PhotoDetail = props => {
    return (
        <div>
            <Card style={{ marginTop: '10px' }}>
                <CardImg top src={props.photo} alt={props.name} />
                <CardBody style={{ textAlign: 'left' }}>
                    <CardTitle
                        className='my-0 py-0'
                        style={{ textTransform: 'uppercase', fontSize: '24px' }}
                    >
                        <strong className='stylish'>{props.name}</strong>
                    </CardTitle>
                    <ColoredHR color='green' />
                    <LoadComments
                        comments={props.comments}
                        commentIsLoading={props.commentIsLoading}
                    ></LoadComments>
                    <ColoredHR color='green' />
                    <CommentForm
                        photoId={props.id}
                        addComment={props.addComment}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default PhotoDetail;
