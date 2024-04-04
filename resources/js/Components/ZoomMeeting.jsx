import {useState} from 'react';
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"
import axios from 'axios';

axios.defaults.withCredentials = true; // Inclut tous les cookies dans la requête

function ZoomMeeting({sdkKey, meetingNumber, userName, password, role}) {

    const [buttonClicked, setButtonClicked] = useState(false);

    // On initialise le Client SDK
    const client = ZoomMtgEmbedded.createClient();

    const launchMeeting = () => {

        function getJWT() {
            return axios.post(route('zoom.signature'), {
                meeting_number: meetingNumber,
                role: role
            }).then((response) => {
                return response.data.jwt;
            }).catch((error) => {
                console.error(error);
                return null;
            });
        }

        getJWT().then((jwt) => {
            if (jwt) {
                client.init({
                    zoomAppRoot: document.getElementById('meetingSDKElement'),
                    language: 'en-US',
                    patchJsMedia: true,
                }).then(() => {
                    client.join({
                        sdkKey: sdkKey,
                        signature: jwt,
                        meetingNumber: meetingNumber,
                        password: password,
                        userName: userName,
                    }).then(() => {
                        console.log('Meeting joined')
                    }).catch((error) => {
                        console.error(error)
                    })
                }).catch((error) => {
                    console.error(error)
                })
                setButtonClicked(true);
            }
        });
    }

    return (
        <div id="meetingSDKElement">
            {!buttonClicked &&
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={launchMeeting}
                >
                    Launch Meeting
                </button>}
        </div>
    );

}

export default ZoomMeeting;
