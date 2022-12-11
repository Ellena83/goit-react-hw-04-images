import { Component } from "react";

export class Searchbar extends Component {
    state = {
        query: ''
    }
    onFormSubmit = evt => {
        evt.preventDefault();
        if (this.state.query.trim() === '') {
            return alert('Query is empty, try again');
        }
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }
    onChangeHandler = evt => {
        // console.log(evt)
        this.setState({ query: evt.currentTarget.value.toLowerCase() });

    }
    render() {
        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.onSubmit}>
                    <button type="submit" className="button">
                        <span className="buttonLabel">Search</span>
                    </button>

                    <input
                        className="input"
                        onChange={this.onChangeHandler}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        inputvalue={this.state.query}
                    />
                </form>
            </header>
        )
    }
}