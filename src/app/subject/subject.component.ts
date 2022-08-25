import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, mergeMap, Observable, ReplaySubject, Subject } from 'rxjs';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const mySubject = new Subject();

    mySubject.next('initial test'); //will not be console logged as there is not subscriber till now


    //multiple observers
    mySubject.subscribe(data => console.log('mySubject observerA:', data));
    mySubject.subscribe(data => console.log('mySubject observerB:', data));

    // mySubject.next('hello from the subject');
    // mySubject.next('second call');

    const myObservable = new Observable( (data) => {
      // data.next('hi');
      // data.next('how');
      // data.next('are');
      // data.next('you');
      data.next(Math.random());
      
    });

    //when observable is subscribed without a subject as an observer, then multiple calls are made for multiple subscribers and different outputs are produced
    myObservable.subscribe(data => console.log('observerA:', data));
    myObservable.subscribe(data => console.log('observerB:', data));

    //subject as an observer
    myObservable.subscribe(mySubject);



    //BehaviourSubject - sends current value to new subscribers

    const myBehave = new BehaviorSubject(5);

    myBehave.subscribe(data => console.log('observer1 from BehaviourSubject', data));

    myBehave.next(2);
    myBehave.next(6);

    //as soon as a new observer subscribe, the latest value is emitted, i.e. 6 in this case
    myBehave.subscribe(data => console.log('observer2 from BehaviourSubject', data));

    myBehave.next(19);

    //same code with Subject produces different output, i.e. the 6 is not produced
    const mySub = new Subject();

    mySub.subscribe(data => console.log('observer1 from Subject', data));

    mySub.next(2);
    mySub.next(6);
    
    //waits for next value
    mySub.subscribe(data => console.log('observer2 from Subject', data));

    mySub.next(19);



    //ReplaySubject - sends old values to the new subscribers

    const myReplay = new ReplaySubject(2);

    //myReplay.subscribe(data => console.log('Replay observer1: ', data)); will output all the values as subscribed before passing the values

    myReplay.next(29);
    myReplay.next(22);
    myReplay.next(14);
    myReplay.next(17);

    myReplay.subscribe(data => console.log('Replay observer1: ', data)); //will only give upto the last two of above plus all below

    myReplay.next(102);
    myReplay.next(493);
    myReplay.next(4923);

    myReplay.subscribe(data => console.log('Replay observer2: ', data));

    myReplay.next(999); //will be logged by both the observers



    //AsyncSubject

    const myAsync = new AsyncSubject();

    myAsync.subscribe(data => console.log('myAsync observer1:', data));

    myAsync.next(21);

    myAsync.subscribe(data => console.log('myAsync observer2:', data));

    myAsync.next(37);
    myAsync.next(3028);
    myAsync.complete();




    


  }


  userInput: string;

  showContent(){
    console.log(this.userInput);
  }

}
