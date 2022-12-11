import { Component } from "react";
//import { createPortal } from "react-dom";
import css from "./Modal.module.css";

//const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {

        window.addEventListener('keydown', this.onCloseHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onCloseHandler)
    }

    onCloseHandler = evt => {
        if (evt.code === 'Escape') {
            console.log('нажали ESC - нужно закрыть модалку');
            console.log(this.props)
            this.props.onClose();
        }
    }
    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    };
    render() {
        return (

            <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
                <div className={css.modalContent}>{this.props.children}</div>
                <img src={this.props.largeImageURL} alt={this.props.tegs}></img>
            </div>
            // modalRoot

        )
    }
}