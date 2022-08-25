import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, fromEvent, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  agents: any;
  agentName: any;


  //Of operator

  students: Observable<string[]> = of(['Mark', 'John', 'Smith']);

  studentObj = {
    id: 1,
    name: 'Qaisher'
  };

  arr = "hello";

  arr$: Observable<any> = from(this.arr);

  names: any = ['alpha', 'delta', 'foxtrot', 'charlie'];
  namesArr$: Observable<string[]> = of(this.names)

  studentObj$: Observable<object> = of(this.studentObj);

  @ViewChild('myBtn')
  myBtn: ElementRef;

  @ViewChild('linkBtn')
  linkBtn: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.agents = new Observable(
      function(observer){
        try {
          observer.next('Ram');
          setInterval(() => {
            observer.next('John');
          }, 2000)
          setInterval(() => {
            observer.next('Smith');
          }, 4000)

        } catch (e) {
          observer.error(e);
        }
      }
    );

    this.agents.subscribe((data: any) => {
      this.agentName = data;
    })

    
    this.students.subscribe(data => console.log(data));

    this.studentObj$.subscribe(data => console.log(data));
    of(this.studentObj).subscribe(data => console.log(data));

    this.arr$.subscribe(data => console.log(data));


    this.namesArr$.subscribe(data => {
      console.log(data);
      
      const seqNum$ = interval(1000);
      
      seqNum$.subscribe(num => {
        if(num<4){
          console.log(data, num, data[num]);
        }
        
      });
    })


  }


  clickEventObservable(){
    const myBtnObservable$ = fromEvent(this.myBtn?.nativeElement, 'click');
    myBtnObservable$.subscribe(data => console.log(data));
    console.log(this.myBtn);

    // const linkBtnObservable$ = fromEvent(this.linkBtn?.nativeElement, 'click');
    // linkBtnObservable$.subscribe(data => console.log(data));
  }

  clickLink() {
    
    const linkBtnObservable$ = fromEvent(this.linkBtn?.nativeElement, 'mouseover');
    linkBtnObservable$.subscribe(data => console.log(data));
  }

  showSearch(){
    this.router.navigate(['search'], {relativeTo: this.route});
  }

  showSubject(){
    this.router.navigate(['subject'], {relativeTo: this.route});
  }

}
