const clientId = '19320e54eadf4442b2e7d2b70a0fbc82';
// const redirectURI = 'http://localhost:3000'
const redirectURI = 'http://spoti-cots_by_apriocot.surge.sh';

let userAccessToken;
let Spotify = {

    getAccessToken() {
        if(userAccessToken){
            return userAccessToken;
        } else {

            let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        
            if(accessTokenMatch && expiresInMatch) {
              userAccessToken = accessTokenMatch[1];
              let expiresIn  = Number(expiresInMatch[1]);
            
              window.setTimeout( () => userAccessToken='', expiresIn * 1000);
              window.history.pushState('Access Token', null, '/');

              return userAccessToken;   
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

                window.location = accessUrl;

            }
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: { Authorization: `Bearer ${accessToken}`}
        }).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map( track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri, 
                }
            })
        });
    } , 
     savePlaylist(name , trackURIs) {

        if(!name || !trackURIs.length) {
            return ;
        } else {
            
            const accessToken = Spotify.getAccessToken();
            const headers = {Authorization : `Bearer ${accessToken}`}
            let userId;

            return fetch('https://api.spotify.com/v1/me',
             {headers: headers}).then( response => {
                 return response.json();
             }).then( jsonResponse => {
                 userId = jsonResponse.id;

                 return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                 {  headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                 }).then(response => response.json()
                  ).then(responseJSON => {
                    const playlistId = responseJSON.id; 
                    
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackURIs})
                    })
                  });
             })

        }

     }  

};


export default Spotify;