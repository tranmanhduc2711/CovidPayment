const axios = require('axios').default;
// Make a request for a user with a given ID
/*axios.post('http://localhost:5000/login', {
        id: 5
    })
    .then(function(response) {
        // handle success
        console.log(response.data.accessToken);

    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });*/
axios.get('http://localhost:5000/find/1')
    .then(function(response) {
        // handle success
        console.log(response.data);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });