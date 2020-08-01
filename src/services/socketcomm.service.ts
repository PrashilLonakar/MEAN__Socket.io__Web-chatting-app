import { OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Socketcomm implements OnInit {
  private socket = io('http://localhost:3000');
  constructor() {}
  ngOnInit() {
    throw new Error('Method not implemented.');
  }

  joinRoom(user, room) {
    console.log('Inside the service joinRoom');
    this.socket.emit('new_joinee', {
      user: user,
      room: room,
    });
  }

  serverJoinRoom() {
    return new Observable((observer) => {
      this.socket.on('server_new_joinee', (data) => {
        observer.next(data);
      });
    });
  }

  serverNewMessage() {
    console.log('M i working right now?');
    return new Observable((observer) => {
      this.socket.on('server_new_message', (data) => {
        observer.next(data);
      });
    });
  }

  sendMessageClient(user, msg, room) {
    console.log('Inside the service ', {
      user: user,
      msg: msg,
      room: room,
    });
    this.socket.emit('client_new_msg', {
      user: user,
      msg: msg,
      room: room,
    });
  }
}
