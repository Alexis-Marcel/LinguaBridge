import {useEffect} from 'react';
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"
import axios from 'axios';

axios.defaults.withCredentials = true; // Inclut tous les cookies dans la requête

const sdkKey = import.meta.env.ZOOM_CLIENT_ID;

function ZoomMeeting({meetingNumber, userName, ...props}) {

    // On initialise le Client SDK
    const client = ZoomMtgEmbedded.createClient();

    useEffect(() => {
        launchMeeting();
    }, []);

    const launchMeeting = () => {

        function getJWT() {
            return axios.post(route('zoom.meeting'), {
                meeting_number: meetingNumber,
            }).then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });
        }

        getJWT().then((data) => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            if (data) {
                client.init({
                    zoomAppRoot: document.getElementById('meetingSDKElement'),
                    language: 'en-US',
                    patchJsMedia: true,
                }).then(() => {
                    client.join({
                        sdkKey: sdkKey,
                        signature: data.jwt,
                        meetingNumber: meetingNumber,
                        password: data.meeting_password,
                        userName: userName,
                    }).then(() => {
                        console.log('Meeting joined')
                    }).catch((error) => {
                        console.error(error)
                    })
                }).catch((error) => {
                    console.error(error)
                })
            }
        });
    }

    return (
        <div id="meetingSDKElement" {...props}></div>
    );

}

export default ZoomMeeting;
