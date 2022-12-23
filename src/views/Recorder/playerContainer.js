/* eslint-disable multiline-ternary */
import React from 'react'
import { Card, CardHeader, Progress } from 'reactstrap'
// import MediaPlayerAudio from './ReactAudioPlayeer'
import ReactPlayer from 'react-player'
// import audio from './audioList/833333043035989.wav'
import { useDispatch, useSelector } from 'react-redux'
import { AUDIO_ACTIVITY } from './store'


function PlayerComponent() {
    const { audioURL, selectedFile, AUDIO_PLAY_STATUS } = useSelector(state => state?.recordingSlice)
    const user = useSelector(state => state?.AuthUserSlice?.userData)

    const dispatch = useDispatch()
    const playerError = (err) => { console.log(err) }
    const onPlay = () => dispatch(AUDIO_ACTIVITY({
        // message: `${user?.first_name + user?.last_name} Played the audio call id  ${selectedFile?.core_callid}`,
        message: `Played the audio call id  ${selectedFile?.core_callid}`,
        user: user?.first_name + user?.last_name,
        type: 2

    }))
    const onEnded = () => { console.log("onEnded.....") }

    // useEffect(() => {
    //     dispatch(GET_AUDIO_ACTIVITY({ page: 0, perPage: 10, q: "" }))
    // }, [])

    return (
        <div>

            <Card>
                <CardHeader style={{ padding: "0.rem 1rem" }}>
                    {audioURL ? <ReactPlayer
                        width='100%'
                        height={60}
                        playing={audioURL && true}
                        style={{ marginBottom: 3 }}
                        controls={true}
                        className='react-player-audio'
                        url={audioURL} // http://localhost/file.wav
                        onError={playerError}
                        // onContextMenu={e => e.preventDefault()}

                        onStart={onPlay}
                        onEnded={onEnded}
                        pip={true}
                        onSeek={(e) => console.log('onSeek', e)}
                        config={{
                            file: {
                                forceAudio: true
                            }
                        }}
                    // url={"../../../public/audio/833333043035989.wav"}
                    // progressInterval={200}
                    // config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    // playbackRate={10}
                    // progressInterval
                    />
                        :
                        <h4 className='fw-bold fs-4'>Select Audio to play...</h4>
                    }
                </CardHeader>
            </Card>
        </div>
    )
}

export default PlayerComponent
