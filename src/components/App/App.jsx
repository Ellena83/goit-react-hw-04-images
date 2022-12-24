import React, { Component } from "react";
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

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    showModal: false,
    error: null,
    id: null,
    largeImageURL: 'largeImageURL',
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (!query) {
      return;
    }
    else if (query !== prevState.query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
        .then(({ hits }) => {
          const imageArray = hits.map(hit => ({
            id: hit.id,
            tags: hit.tags,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          }))
          return this.setState(({ images, imagesPerPage }) => {
            return {
              images: [...images, ...imageArray],
              imagesPerPage: imagesPerPage + imageArray.length,
            }
          })
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: '',
    }))
  }

  handleFormSubmit = query => {
    this.setState({ query });
  }

  onLoadMore = () => {
    this.setState(prevState => (
      { page: prevState.page + 1 }
    ))
  }

  handleGalleryItem = (fullImageURL => {
    this.setState({ largeImageURL: fullImageURL, showModal: true })
  })

  render() {
    const { images, isLoading, showModal, largeImageURL, tegs } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handleFormSubmit} />

        {images.length < 1 && <Message>
          <h2>The gallery is empty ... </h2>
          <p>Use search field!</p>
        </Message>}

        {images && <ImageGallery
          images={images}
          onImageClick={this.handleGalleryItem} />}

        {!isLoading && (images.length % 12 === 0)
          && (images.length !== 0)
          && (<Button
            onLoadMore={this.onLoadMore}
          />)}

        {showModal && (<Modal
          onClose={this.toggleModal} >
          <button type="button" className={css.modalBtn} onClick={this.toggleModal}>
            <BsXLg className={css.icon} />
          </button>
          <img className="modalImage" src={largeImageURL} alt={tegs} />
        </Modal>)}

        {isLoading && <Loader />}

        <ToastContainer />
      </>
    );
  }
}
