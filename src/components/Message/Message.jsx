import css from './Message.module.css';
import PropTypes from "prop-types";

export const Message = ({ children }) => (
    <div className={css.message}>{children}</div>
)
Message.defaultProps = {
    children: [],
};

Message.propTypes = {
    children: PropTypes.node,
};