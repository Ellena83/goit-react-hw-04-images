import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ images, onImageClick }) => {
    if (images.length === 0) {
        return null
    }
    return (
        <ul className={css.gallery}>
            {images.map(image => {
                return (
                    <ImageGalleryItem
                        onImageClick={onImageClick}
                        key={image.id}
                        image={image}
                    />
                )
            }

            )}
        </ul>
    )
}
ImageGallery.propTypes = {
    onImageClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    )
}