const clientId = '19320e54eadf4442b2e7d2b70a0fbc82';
// const redirectURI = 'http://localhost:3000/'
const redirectURI = 'http://spoti-cots_by_apricot.surge.sh';

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

    search(term, type) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);

        if(type === 'track')
        {
            return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`,
            {
                headers: { Authorization: `Bearer ${accessToken}`}
            }).then( response => {
                // console.log(response);
                return response.json();
            }).then( jsonResponse => {
                    // console.log(jsonResponse);
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
                    });
                
            });
        };

        if(type === 'artist') {

           return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`,
            {
                headers: { Authorization: `Bearer ${accessToken}`}
            }).then( response => {
                return response.json();
            }).then( jsonResponse => {
                
                    if(!jsonResponse.artists) {
                    return [];
                    }
                    

                        let artistID = jsonResponse.artists.items[0].uri;
                        let artistURI = artistID.split(':');
                        // console.log(artistURI);
                        return fetch(`https://api.spotify.com/v1/artists/`+artistURI[2]+`/top-tracks?country=IN`,
                        {
                            headers: { Authorization: `Bearer ${accessToken}`}
                        }).then ( response2 => {
                            return response2.json();

                            }).then( responseJSON => {
                                console.log(responseJSON);
                                if(!responseJSON.tracks) {
                                    return [];
                                }

                                return responseJSON.tracks.map( track => {
                                    return {
                                        id: track.id,
                                        name: track.name,
                                        artist: track.artists[0].name,
                                        album: track.album.name,
                                        uri: track.uri, 
                                        }
                                    });    
                        });

    
                        
                    
            });
        };

        if(type === 'album') {

            return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`,
            {
                headers: { Authorization: `Bearer ${accessToken}`}
            }).then( response => {
                // console.log(response);
                return response.json();
            }).then( jsonResponse => {
                    console.log(jsonResponse);
                    if(!jsonResponse.albums.items) {
                    return [];
                    }
                        // console.log(jsonResponse.albums.items[0].id)
                        let items = jsonResponse.albums.items;
                        console.log(items.length);
                        for(let i=0; i < items.length; i++) {
                            return fetch(`https://api.spotify.com/v1/albums/${items[i].id}/tracks`, 
                                {
                                    headers: { Authorization: `Bearer ${accessToken}`}
                                }).then( response => {
                                    return response.json();
                                }).then(JSONResponse => {

                                    console.log(JSONResponse);

                                    return JSONResponse.items.map( track => {

                                        return {
                                            id: track.id,
                                            name: track.name,
                                            artist: track.artists[0].name,
                                            album: items[0].name,
                                            uri: track.uri, 
                                            }
                                        });


                                });
                        }
                    
                    });
                
        }
            
        
        

    }, 
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