import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import PhotoDetail from './PhotoDetail';
// import Loading from './Loading';
import { CardColumns, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { addComment, fetchComments } from '../redux/actionCreators';

const mapStateToProps = state => {
    // console.log(state.comments);
    return {
        comments: state.comments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addComment: (photoId, rating, author, comment, token) =>
            dispatch(addComment(photoId, rating, author, comment, token)),
        fetchComments: () => dispatch(fetchComments()),
    };
};

class Gallery extends Component {
    state = {
        selectedPhoto: null,
        modalOpen: false,
    };

    importAll(r) {
        return r.keys().map(r);
    }

    onPhotoSelect = photo => {
        this.setState({
            selectedPhoto: photo,
            modalOpen: !this.state.modalOpen,
        });
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    componentDidMount() {
        this.props.fetchComments();
    }

    render() {
        // console.log(`./images/${this.props.category}/`);
        // let path = `./images/${this.props.category}/`;
        // console.log(typeof path);
        document.title = 'Gallery';
        let listOfImages = [];

        switch (this.props.category) {
            case 'rain':
                listOfImages = this.importAll(
                    require.context(
                        `./images/rain`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            case 'cloud':
                listOfImages = this.importAll(
                    require.context(
                        `./images/cloud`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            case 'tech':
                listOfImages = this.importAll(
                    require.context(
                        `./images/tech`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            default:
                break;
        }

        // console.log(listOfImages);

        const menu = listOfImages.map(photo => {
            // console.log(typeof photo.default);
            return (
                <PhotoItem
                    src={photo.default}
                    key={photo.default.split('/')[3].split('.')[1]}
                    name={photo.default.split('/')[3].split('.')[0]}
                    PhotoSelect={() => this.onPhotoSelect(photo.default)}
                />
            );
        });

        let photoDetail = null;
        if (this.state.selectedPhoto != null) {
            const comments = [];

            for (let key in this.props.comments) {
                let comment = this.props.comments[key];
                if (
                    comment.photoId ===
                    this.state.selectedPhoto.split('/')[3].split('.')[1]
                ) {
                    comments.push({
                        ...comment,
                        id: key,
                    });
                }
            }
            photoDetail = (
                <PhotoDetail
                    photo={this.state.selectedPhoto}
                    name={this.state.selectedPhoto.split('/')[3].split('.')[0]}
                    id={this.state.selectedPhoto.split('/')[3].split('.')[1]}
                    comments={comments}
                    addComment={this.props.addComment}
                    commentsIsLoading={this.props.comments.isLoading}
                />
            );
        }
        return (
            <div className='container-fluid'>
                <h1
                    className='text-center mb-4'
                    style={{ textTransform: 'uppercase' }}
                >
                    Category:{' '}
                    <strong className='stylish'>{this.props.category}</strong>
                </h1>
                <div className='row'>
                    <CardColumns>{menu}</CardColumns>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>{photoDetail}</ModalBody>
                        <ModalFooter>
                            <Button
                                color='secondary'
                                onClick={this.toggleModal}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Gallery));
