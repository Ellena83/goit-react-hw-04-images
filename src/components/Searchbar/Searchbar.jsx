import { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import css from "./Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const onFormSubmit = evt => {
        evt.preventDefault();

        if (query.trim() === '') {
            toast.error('Write your request please!');
            return;
        }
        setQuery('');
        onSubmit(query);
    }

    const onChangeHandler = evt => {
        setQuery(evt.currentTarget.value.toLowerCase());
    }

    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={onFormSubmit}>
                <button type="submit" className={css.button}>
                    <FaSearch size={16} />
                </button>

                <input
                    className={css.input}
                    onChange={onChangeHandler}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                />
            </form>
        </header>
    )
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}