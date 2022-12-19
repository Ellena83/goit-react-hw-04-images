import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ image, onImageClick }) => {
    const fullImage = () => onImageClick(image.largeImageURL);
    return (
        <li className={css.galleryItem} >
            <img src={image.largeImageURL}
                alt={image.tags}
                className={css.img}
                onClick={fullImage} />
        </li>
    )
}
ImageGalleryItem.propTypes = {
    onImageClick: PropTypes.func.isRequired,
    image: PropTypes.shape({
        webformarURL: PropTypes.string,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string.isRequired,
    }),
}
ImageGalleryItem.defaultProps = {
    tags: '',
};