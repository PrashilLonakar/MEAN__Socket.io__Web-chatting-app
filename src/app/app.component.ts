import { Component, OnInit } from '@angular/core';
import { Socketcomm } from '../services/socketcomm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedRoom: string;
  user: string = '';
  date = new Date();
  msgList: any[] = [];
  msg: string;
  constructor(private socketcommService: Socketcomm) {}
  ngOnInit() {
    this.socketcommService.serverNewMessage().subscribe(
      (res) => {
        console.log('The server response is (when sending message)', res);
        this.msgList.push(res);
      },
      (error) => {
        console.log('the error is', error);
      }
    );
    this.socketcommService.serverJoinRoom().subscribe(
      (res) => {
        console.log('The server response is', res);
        this.msgList.push(res);
      },
      (error) => {
        console.log('the error is', error);
      }
    );
    console.log('MSG in ngOnit', this.msgList);
  }

  selectRoom() {
    console.log('User is ' + this.user);
    console.log('Selected Room is ' + this.selectedRoom);
    this.socketcommService.joinRoom(this.user, this.selectedRoom);
  }

  sendMessage(){
    console.log('Inside the send message');
    this.socketcommService.sendMessageClient(
      this.user,
      this.msg,
      this.selectedRoom
    );
    const data = {
      user: this.user,
      msg: this.msg ,
      date: this.date,
    }
    this.msgList.push(data);
     console.log('MSG when sendMessage', this.msgList);
     this.msg = '';
  }
  title = 'chat-client';
}
