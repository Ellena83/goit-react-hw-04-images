import { useEffect, useState } from "react";
import { fetchImages } from "services/api";
import { Searchbar } from "../Searchbar/Searchbar";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Message } from '../Message/Message';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsXLg } from 'react-icons/bs';
import css from '../Modal/Modal.module.css';

export const App = () => {
  const [images, setImages] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImage] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalImages(totalHits);
      })
      .catch(error => setError({ error }))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(false);
  }

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImage('');
  }

  const handleGalleryItem = (fullImageURL => {
    setLargeImage(fullImageURL);
    setShowModal(true);
  })

  return (
    <>
      <Searchbar
        onSubmit={handleFormSubmit} />

      {images.length < 1 && <Message>
        <h2>The gallery is empty ... </h2>
        <p>Use search field, please!</p>
      </Message>}

      {images && <ImageGallery
        images={images}
        onImageClick={handleGalleryItem} />}

      {images.length > 0
        && images.length >= 12
        && images.length < totalImages
        &&
        (<Button
          onClick={() => setPage(prevPage => prevPage + 1)}
        />)
      }

      {images.length > 0
        && images.length >= totalImages
        && <Message>
          <p>The end of gallery! </p>
        </Message>}

      {showModal && (<Modal
        onClose={toggleModal} >
        <button type="button" className={css.modalBtn} onClick={toggleModal}>
          <BsXLg className={css.icon} />
        </button>
        <img className="modalImage" src={largeImageURL} alt={images.tegs} />
      </Modal>)}

      {isLoading && <Loader />}

      {error && <Message>
        <p>Oops... something wrong!...</p>
      </Message>}

      <ToastContainer />
    </>
  );
}
