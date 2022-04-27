import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AppService } from './app.service';
import { ZoomMtg } from '@zoomus/websdk';
import { map, tap } from 'rxjs/operators';
import { MeetingDTO, AccessMeetingDTO, KeysMeetingDTO } from './core/model';
import { lastValueFrom } from 'rxjs';


ZoomMtg.setZoomJSLib('https://source.zoom.us/2.3.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('pt-BR');
ZoomMtg.i18n.reload('pt-BR');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {

  }

  constructor(
    private httpClient: HttpClient, 
    private AppService: AppService,
    @Inject(DOCUMENT) public document: Document,

  ) {
    this.meeting.topic = '';
    this.meeting.duration = '';
    this.meeting.password = '';

    this.accessMeeting.idMeeting = '';
    this.accessMeeting.join_url = '';
    this.accessMeeting.start_url = '';
    this.accessMeeting.password = '';
    this.accessMeeting.status = false;

    this.keysMeeting.signatureEndpoint = 'http://localhost:4000';
    this.keysMeeting.sdkKey = 'ptoYEYlvf7AahV9uY8nXW7Q5BiXTO5nEFtAU';
    this.keysMeeting.meetingNumber = '';
    this.keysMeeting.role = 0;
    this.keysMeeting.leaveUrl = 'http://localhost:4200';
    this.keysMeeting.userName = 'Angular';
    this.keysMeeting.userEmail = 'filipe.soares.fn@gmail.com';
    this.keysMeeting.passWord = '';
    this.keysMeeting.registrantToken = '';

    this.dateNow = new Date();
  }

  public testeApi: any;
  public infomeeting: any;
  public dateNow: Date = new Date();
  public infoMeeting: any;
  public meeting: MeetingDTO = new MeetingDTO;
  public accessMeeting: AccessMeetingDTO = new AccessMeetingDTO;
  public keysMeeting: KeysMeetingDTO = new KeysMeetingDTO;
  
  dialogCriarMeeting: boolean = false;
  dialogEntrarMeeting: boolean = false;
  clickButtonCreate: boolean = false;
  
  signatureEndpoint = 'http://localhost:4000'
  

  showDialogCriarMeeting() {
    this.dialogCriarMeeting = true;
    this.clickButtonCreate = true;
  }
  dropDialogCriarMeeting() {
    this.dialogCriarMeeting = false;
    this.clickButtonCreate = false;
  }

  showDialogEntrarMeeting() {
    this.dialogEntrarMeeting = true;
    console.log("ENTRAR")
  }
  dropDialogEntrarMeeting() {
    this.dialogEntrarMeeting = false;
  }


  getSignature() {
    console.log("BATATA- ",this.keysMeeting.meetingNumber)
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.keysMeeting.meetingNumber,
	    role: this.keysMeeting.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error: any) => {
      console.log(error)
    })
  }

  startMeeting(signature: any) {
    document.getElementById('zmmtg-root')!.style.display = 'block'
    ZoomMtg.init({
      leaveUrl: this.keysMeeting.leaveUrl,
      success: (success: any) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.keysMeeting.meetingNumber,
          userName: this.keysMeeting.userName,
          sdkKey: this.keysMeeting.sdkKey,
          userEmail: this.keysMeeting.userEmail,
          passWord: this.keysMeeting.passWord,
          tk: this.keysMeeting.registrantToken,
          success: (success: any) => {
            console.log(success)
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  async CreateMeeting()  {
    try {
      
      var meeting = {
        status: 'active',
        topic: this.meeting.topic,
        type: "2",
        start_time: "2022-04-22T12:19:00",
        duration: this.meeting.duration, //mins
        password: this.meeting.password,
        settings: {
            host_video: true,
            participant_video: true,
            mute_upon_entry: true,
        }
      };
  
      var body = JSON.stringify(meeting);
      //this.meeting = await this.AppService.criarMeeting(body).toPromise();

      this.infomeeting = await lastValueFrom(this.AppService.CreateMeeting(body));
      this.accessMeeting.idMeeting = this.infomeeting.id;
      this.keysMeeting.meetingNumber = this.accessMeeting.idMeeting;
      this.accessMeeting.start_url = this.infomeeting.start_url;
      this.accessMeeting.join_url = this.infomeeting.join_url;
      this.accessMeeting.password = this.infomeeting.password;
      this.keysMeeting.passWord = this.accessMeeting.password;
      this.accessMeeting.status = true;
      this.clickButtonCreate = false;
    } catch (e :any) {
      console.log(e.stack);
    }
  }

  async deleteMeeting()  {
    try { 

      this.infomeeting = await lastValueFrom(this.AppService.DeleteMeeting(this.accessMeeting.idMeeting));
      this.accessMeeting.status = false;
    } catch (e :any) {
      console.log(e.stack);
    }
  }
}
