import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onCloseHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onCloseHandler)
    }

    onCloseHandler = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    }
    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    };
    render() {
        return createPortal(
            <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
                <div className={css.modalContent}>{this.props.children}</div>
            </div>,
            modalRoot,
        )
    }
}
Modal.defaultProps = {
    children: null,
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};