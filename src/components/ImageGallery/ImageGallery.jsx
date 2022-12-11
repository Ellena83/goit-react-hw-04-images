import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({ images, openModal }) => {
    if (images.length === 0) {
        return null
    }
    return (
        <ul className="gallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) =>
            (
                <ImageGalleryItem
                    openModal={openModal}
                    key={id}
                    src={webformatURL}
                    alt={tags}
                    url={largeImageURL} />
            )
            )}
        </ul>
    )
}