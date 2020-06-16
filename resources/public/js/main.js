console.info(`Amazon Chime SDK Version: ${ChimeSDK.Versioning.sdkVersion}`);

let meetingSession;
let configuration;

let localVideoStarted = false;
let localVideoEnabled = false;

let videoElements = [];

let startButton;
let toggleVideoButton;

async function getMeetingInfo() {
    try {
        const meetingName = 'TutorEnCasa';
        const response = await fetch('/api/meeting/join', {
                            body: `title=${meetingName}&name=User${Math.floor(Math.random()*100)}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                            },
                        })
                        .then((res) => res.json());
        return response;
    } catch (error) {
        console.error(error)
    }
}

async function startMeeting() {
    const joinInfo = getMeetingInfo().JoinInfo;
    const config = new ChimeSDK.MeetingSessionConfiguration(joinInfo.Meeting, joinInfo.Attendee);
    console.log(`Meeting: ${joinInfo.Meeting.Meeting.MeetingId}`);
    console.log(`Attendee: ${joinInfo.Attendee.Attendee.AttendeeId}`);

    const logger = new ChimeSDK.ConsoleLogger(
        "ChimeMeetingLogs", 
        ChimeSDK.LogLevel.WARN
    );

    const deviceController =  new ChimeSDK.DefaultDeviceController(logger);
    meetingSession = new ChimeSDK.DefaultMeetingSession(
      config,
      logger,
      deviceController
    );

    initUserInterface();

    await initAudioInput();
    await initVideoInput();
    await initAudioOutput();
    await initObserver();

    startButton.style.display = 'block';
}

function initUserInterface(){
    // UI event listeners
    startButton = document.getElementById('startButton');
    startButton.addEventListener('click', ()=> {
      meetingSession.audioVideo.start(); 
      startButton.style.display = 'none';
    });
  
    toggleVideoButton = document.getElementById('toggleVideoButton');
    toggleVideoButton.addEventListener('click', ()=> {
      toggleLocalVideo();
    });
  
    let tilesElement = document.getElementById('tiles')
    for (let i=0; i<=16; i++){
      let videoElement = document.createElement('video')
      videoElement.id = `video-${i+1}`
      videoElement.setAttribute('autoplay', true)
      videoElements.push(videoElement);
      tilesElement.appendChild(videoElement)
    }
}

const initAudioInput = async function(){
    // Audio Input
    let audioDevices = await meetingSession.audioVideo.listAudioInputDevices();
    if (!audioDevices.length){
      console.error('You need sound devices to run this demo')
    }
    await meetingSession.audioVideo.chooseAudioInputDevice(audioDevices[0]);
}
  
async function initAudioOutput(){
    // Audio Output
    const audioOutputElement = document.getElementById("audioStream");
    await meetingSession.audioVideo.bindAudioElement(audioOutputElement);
}

async function initVideoInput(){
    // Video Input
    let videoDevices = await meetingSession.audioVideo.listVideoInputDevices();
    if (!videoDevices.length){
        console.error('You need video devices to run this demo')
    }
    await meetingSession.audioVideo.chooseVideoInputDevice(videoDevices[0]);
}

async function startLocalVideo(){
    console.log('Starting video...')
    await meetingSession.audioVideo.startLocalVideoTile();
    toggleVideoButton.style.display = 'block';
    localVideoStarted = true;
    localVideoEnabled = true;
}

async function toggleLocalVideo(){
    if (localVideoEnabled){
        await meetingSession.audioVideo.stopLocalVideoTile();
        localVideoEnabled = false;
        console.log('ToggleVideo: OFF');
        toggleVideoButton.textContent = 'Turn Video On'
    } else {
        await initVideoInput();
        await meetingSession.audioVideo.startLocalVideoTile();
        localVideoEnabled = true;
        console.log('ToggleVideo: ON');
        toggleVideoButton.textContent = 'Turn Video Off'
    }
}


const initObserver = function(){
    const observer = {

        audioVideoDidStart: () => {
        console.log('Meeting Started');
        },
        videoAvailabilityDidChange: availability => {
        console.log(`=> videoAvailabilityDidChange`, availability);
        if (availability.canStartLocalVideo && !localVideoStarted) {
            startLocalVideo();
        }
        },
        audioVideoDidStartConnecting: reconnecting => {
        if (reconnecting) {
            console.log('Attempting to reconnect');
        }
        },
        audioVideoDidStop: sessionStatus => {
        // See the "Stopping a session" section for details.
        console.log('Stopped with a session status code: ', sessionStatus.statusCode());
        },
        videoTileDidUpdate: tileState => {
        if (!tileState.boundAttendeeId){
            return;
        }
        console.log('videoTileDidUpdate', tileState.tileId, tileState.boundAttendeeId)
        meetingSession.audioVideo.bindVideoElement(
            tileState.tileId, 
            acquireVideoElement(tileState.tileId)
        );
        },
        videoTileWasRemoved: tileId => {
        console.log('remove tile', tileId);
        releaseVideoElement(tileId)
        },
    }
    meetingSession.audioVideo.addObserver(observer);
}

const login = async (email, password) => {
    const response = await fetch('/api/login', {
        body: `email=${email}&password=${password}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then((res) => res.json());
    return response;
};

document.addEventListener('DOMContentLoaded', async (event) => {
    const loginResponse = await login('admin@email.com', 'PASS@23pass');
    console.log(loginResponse);
    startMeeting();
});