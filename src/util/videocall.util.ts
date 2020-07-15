class VideoCall {
    private tutor: VideoCallUser;
    private student: VideoCallUser;

    constructor(tutor: VideoCallUser, student: VideoCallUser) {
        this.tutor = tutor;
        this.student = student;
    }
}

interface VideoCallUser {
    id: number;
    uid: number; 
}

export { 
    VideoCall,
    VideoCallUser,
};