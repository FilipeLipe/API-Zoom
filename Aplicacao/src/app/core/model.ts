export class MeetingDTO {
    id = 0;
    status = '';
    topic = '';
    type = '';
    start_time = '';
    duration = '';
    password = ''; 
    host_video = true;
    participant_video = true;
    mute_upon_entry = true;
}

export class AccessMeetingDTO {
    idMeeting='';
    join_url = '';
    password = '';
    start_url = '';
    status = false;
}

export class KeysMeetingDTO{
    signatureEndpoint = ''
    sdkKey = ''
    meetingNumber = ''
    role = 0
    leaveUrl = ''
    userName = ''
    userEmail = ''
    passWord = ''
    registrantToken = ''
}