import { Component } from "react";
import { fetchImages } from "services/api";
//import css from "../index.css";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";

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
    largeImageURL: 'largeImageURL'
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getImage(query, page);
    }
  }
  getImage = async (q, page) => {
    //console.log(value)
    this.setState({ isLoading: true });
    if (!q) {
      return;
    }
    try {
      const { hits } = await fetchImages(q, page);

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
    }
    catch (error) {
      this.setState({ error: error.message });
    }
    finally {
      this.setState({ isLoading: false });
    }
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }
  onFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  }
  //ф-ция клика на кнопку
  onLoadMore = () => {
    this.setState(prevState => (
      { page: prevState.page + 1 }
    ))
  }
  render() {
    const { images, page, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery images={images}
          openModal={this.toggleModal} />

        {isLoading && <Loader />}

        {!isLoading && (images.length % 12 === 0)
          && (images.length !== 0)
          && (<Button onLoadMore={this.onLoadMore} page={page} />)}

        {showModal && (<Modal onClose={this.toggleModal}
          largeImageURL={largeImageURL} />

        )
        }



      </div>
    );
  }

};
