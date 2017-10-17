import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs'; 

// HEAVILY MODIFIED FOR THE PURPOSE OF HAKRON ARDUINO WORKSHOP BY MATT MCDADE
// 10/17/2017
// og was larry. bless larry

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit()
  {
    this.getStuff();

    var timer = Observable.interval(2000);
    timer.subscribe(auto => this.getStuff());
  }
  
  constructor(private http: HttpClient, private modalService: NgbModal){
  }

  closeResult: string;
  
  open(content) {

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  readers = [];
  //found = [];
  title = 'the leaderboard';
  //everyone = {};
  //lookupName = '';
  getStuff(){        
    this.http.get('https://hakron.io/arcade/api/readers').subscribe(data => {
    
      //console.log('got stuff')
      //TODO: Live update leaderboard and get rid of button!
        console.log(data);
      var result = JSON.stringify(data);
      this.readers = JSON.parse(result);
      for (let index in this.readers) {
      this.readers[index].num = (parseInt(index) + 1);
          console.log(this.readers[index].num)
          console.log(this.readers[index].tag)
      }

    });
  };
//  nameLookup(content){
//    if(this.lookupName)
//      {
//      var lowercase = this.lookupName.toLowerCase();
//      var uppercaseFirst = this.lookupName[0].toUpperCase() + this.lookupName.slice(1, this.lookupName.length)
//      var allCapital = this.lookupName.toUpperCase();
//      console.log(allCapital)
//      
//      console.log(lowercase);
//      for(let i = 0; i < this.people.length; i++)
//        {
//          //console.log(this.people[i].name.toUpperCase());
//          if(this.people[i].name === this.lookupName || this.people[i].name.toLowerCase() === this.lookupName || this.people[i].name[0].toUpperCase() + this.people[i].name.slice(1, this.people[i].name.length) === this.lookupName 
//            || this.people[i].name.toUpperCase() === this.lookupName 
//            || this.people[i].name.split(" ").includes(this.lookupName)
//            || this.people[i].name.indexOf(this.lookupName) !== -1
//            || this.people[i].name.toLowerCase().indexOf(this.lookupName) !== -1 
//            || this.people[i].name[0].toUpperCase().indexOf(this.lookupName) !== -1) 
//            {
//            this.found.push(this.people[i]);      
//            }
//            
//        }
//        if(this.found.length > 0)
//          {
//            //console.log(this.found[0].name);
//            this.modalService.open(content).result.then((result) => {
//              this.closeResult = `Closed with: ${result}`;
//              this.found = [];
//            }, (reason) => {
//              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//              this.found = [];
//            });
//          }
//          else{alert('We didn\'t find anyone with that name.');}
//    }
//    else{alert('Please enter a name');}
//  }
}
