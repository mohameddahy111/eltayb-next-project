import {io} from 'socket.io-client'

class MySocket {
  public socket;
  public URL;
  
  constructor() {
    this.URL = 'http://localhost:3000/';
    this.socket = io(this.URL, {autoConnect: false});
  }
}

export default MySocket