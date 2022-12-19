import { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import css from "./Searchbar.module.css";

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        query: '',
    };

    onFormSubmit = evt => {
        evt.preventDefault();
        const { onSubmit } = this.props;
        const { query } = this.state;

        if (query.trim() === '') {
            toast.error('Write your request please!');
            return;
        }
        this.setState({ query: '' });
        onSubmit(query);
    }

    onChangeHandler = evt => {
        this.setState({ query: evt.currentTarget.value.toLowerCase() });
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.onFormSubmit}>
                    <button type="submit" className={css.button}>
                        <FaSearch size={16} />
                    </button>

                    <input
                        className={css.input}
                        onChange={this.onChangeHandler}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                    />
                </form>
            </header>
        )
    }
}