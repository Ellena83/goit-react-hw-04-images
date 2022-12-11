export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
    return (
        <li className="galleryItem"
            onClick={() => openModal(largeImageURL)} >
            <img src={src}
                alt={alt}
                url={largeImageURL} />
        </li>
    )
}