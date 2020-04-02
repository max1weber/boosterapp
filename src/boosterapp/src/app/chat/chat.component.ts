import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { User } from '../shared/user';
import { chatmessage } from '../shared/ChatMessage';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked  {

  @ViewChild('scrollMe') private myMsgContainer: ElementRef;

  showChat=false;
  userData:User;
  msgVal :string = "";
  
  items: AngularFireList<chatmessage>;
  messages : chatmessage[];

  constructor(private firebase: AngularFireDatabase, public af: AngularFireAuth) {
    this.items = firebase.list<chatmessage>('chatmessage');

    this.firebase.list<chatmessage>('chatmessage').valueChanges().subscribe(res => {
        console.log(res)//should give you the array of percentage. 
        this.messages = res;
    })

    this.af.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(){
   
    this.showChat = !this.showChat;
   }


  

  ngOnInit(): void {
    this.scrollToBottom();
  }


  scrollToBottom() {
    try {
      this.myMsgContainer.nativeElement.scrollTop = this.myMsgContainer.nativeElement.scrollHeight;
    } catch(err) { }  
  }


  getMsgClass(msg: chatmessage)
 {

    return (msg.messageid ==this.userData.uid.toLowerCase() )? "chat-msg self" : "chat-msg user";
  
 }

  login(){

      this.AuthLogin(new auth.FacebookAuthProvider());

  }

  AuthLogin(provider) {
    return this.af.signInWithPopup(provider)
    .then((result) => {
       
     this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user:any) {
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    localStorage.setItem('user', JSON.stringify(userData));
  }

  SignOut(){

    return this.af.signOut().then(() => {
      
      localStorage.removeItem('user');
     this.userData = null;
    }, error => console.log(error))
  }

  SendMessage(msgcontent:string){

    let datetime = new Date().toISOString();
     let message :chatmessage = {
        messageDateTime : datetime,
        content : msgcontent,
        displayName : this.userData.displayName,
        photoURL : this.userData.photoURL,
        messageid : this.userData.uid.toLowerCase()
      
     }

     console.log(message);
     
    this.items.push(message);
    this.msgVal = "";

  }
}
