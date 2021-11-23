import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';
import PhotoItem from './PhotoItem';
// import ReactDOM from 'react-dom';

class PhotoGallery extends Component {
    importAll(r) {
        return r.keys().map(r);
    }

    onPhotoSelect(category) {
        this.props.history.push(`/photos/${category}`);

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    render() {
        const listOfImages = this.importAll(
            require.context('./images/categories/', false, /\.(png|jpe?g|svg)$/)
        );

        // console.log(listOfImages);

        const categories = listOfImages.map(photo => {
            // console.log(typeof photo.default);
            return (
                <PhotoItem
                    src={photo.default}
                    key={photo.default.split('/')[3].split('.')[1]}
                    name={photo.default.split('/')[3].split('.')[0]}
                    PhotoSelect={() =>
                        this.onPhotoSelect(
                            photo.default.split('/')[3].split('.')[0]
                        )
                    }
                />
            );
        });

        return (
            <div>
                <h1 className='text-center stylish mb-4'>Categories</h1>
                <CardColumns>{categories}</CardColumns>
            </div>
        );
    }
}

export default PhotoGallery;
