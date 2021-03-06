import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { User } from '../shared/user';
import { chatmessage } from '../shared/ChatMessage';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ApplicationInsightService } from '../services/application-insight.service';




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
  disableScrollDown = false
  items: AngularFireList<chatmessage>;
  messages : chatmessage[];


  constructor(private firebase: AngularFireDatabase, public af: AngularFireAuth, private analytics: GoogleAnalyticsService, private appinsights: ApplicationInsightService) {
    this.items = firebase.list<chatmessage>('chatmessage');

    this.firebase.list<chatmessage>('chatmessage').valueChanges().subscribe(res => {
        
        this.messages = res;
        
    })

    this.af.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.appinsights.setUserId(this.userData.displayName);
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        this.appinsights.clearUserId();
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }
  ngAfterViewChecked(): void {
    
    
  }

  toggleChat(){
   
    this.showChat = !this.showChat;
   }


  

  ngOnInit(): void {
    this.scrollToBottom();
  }


  scrollToBottom() {
    try {

      let element = this.myMsgContainer.nativeElement
        let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
        if (this.disableScrollDown && atBottom) {
            this.disableScrollDown = false
        } else {
          this.myMsgContainer.nativeElement.scrollTop = this.myMsgContainer.nativeElement.scrollHeight;
            this.disableScrollDown = true
        }
      
    } catch(err) { }  
  }

  getMessageCount(){
   return this.messages? this.messages.length.toString() : "0";
  }

  getMsgClass(msg: chatmessage)
 {

  if (this.userData)
  {
    return (msg.messageid ==this.userData.uid.toLowerCase() )? "chat-msg self" : "chat-msg user";
  }else
  {
    return "chat-msg user";
  }
 }

  FBlogin(){

      this.AuthLogin(new auth.FacebookAuthProvider());

  }
  MSlogin(){

    var provider = new auth.OAuthProvider('microsoft.com');
    this.AuthLogin(provider);

}

  Googlelogin(){

    this.AuthLogin(new auth.GoogleAuthProvider());

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
      this.appinsights.clearUserId();
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
     this.items.push(message);
     this.disableScrollDown=false;
     
     if (this.messages.length>0)
     {

      this.analytics.eventEmitter("ChatComponent.SendMessage","Chat", "Send Message" , "Value", this.messages.length);
      
     }

     
     
     
    
    
    this.msgVal = "";
   
    

  }
}
