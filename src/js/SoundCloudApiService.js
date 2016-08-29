var SoundCloudApiService = (function(SC, API_CLIENT_ID) {
    function init() {
        SC.initialize({
            client_id: API_CLIENT_ID
        });
    }

    function tracks(q, callback) {
        if (!q) {
            throw new Error('no search term defined');
        }

        var opts = {
            q: q,
            limit: 200
        };

        SC.get('/tracks', opts).then(function(results) {
            callback({success: true, results: results});
        }, function() {
            callback({success: false});
        });
    }

    function stream(trackId, callback) {
        SC.stream('/tracks/' + trackId).then(function(sound) {
            callback({success: true, sound: sound});
        }, function() {
            callback({success: false});
        });
    }

    init();

    return {
        tracks: tracks,
        stream: stream
    }
}(SC, 'ea9b001d624a3050de42842eb0be5e3b'));

export default SoundCloudApiService;
