import React, { Component } from 'react';
import SoundCloudApiService from '../../js/SoundCloudApiService.js';
import SoundCloudPlayer from '../../js/SoundCloudPlayer.js';

class SearchBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" placeholder="Enter an artist, song or genre to start playing" ref="searchInput" />
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();

        var searchValue = this.refs.searchInput.value;

        SoundCloudApiService.tracks(searchValue, function(response) {
            if (!response.success) {
                alert('Oops! An error occurred, please try again.');
            }

            if (!response.results.length) {
                alert('No tracks found');
            }

            // Todo
        });
    }
}

export default SearchBox;
