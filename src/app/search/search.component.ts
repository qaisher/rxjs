import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { count, distinct, elementAt, filter, first, forkJoin, last, map, mapTo, max, min, Observable, of, skip, zip } from 'rxjs';
import { debounceTime, from, take, takeLast, takeWhile } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  takeWhileForm: FormGroup;
  //name: FormControl;

  items = ['mouse', 'keyboard', 'pin', 'scanner', 'printer', 'key', 'pin', 'scanner', 'key'];
  items$: Observable<string> = from(this.items);

  numberArray = [3, 2, 6, 22, 66, 24, 63, 36];
  numberArray$: Observable<number> = from(this.numberArray);

  myObs$ = new Observable(data => {
    data.next(3);
    data.next(1);
    data.next(8);
    data.complete();
  });
  myObs2$ = new Observable(data => {
    data.next(56);
    data.next(199);
    data.next(811);
    data.next(4038);
    data.complete();
  });


  myArrObs$ = of(33, 63, 36, 83);


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('start search')
    });

    this.takeWhileForm = new FormGroup({
      box: new FormControl('start')
    });


//debounceTime and take Operators

    this.searchForm.get('name')?.valueChanges.pipe(
      
      debounceTime(2000),
      take(3)
    ).subscribe(data => console.log(data));

//takeWhile and takeLast operator
    this.takeWhileForm.get('box')?.valueChanges.pipe(
      takeWhile((val) => this.checkCondition(val))
    ).subscribe(data => console.log(data));


    this.items$.pipe(
      takeLast(3)
    ).subscribe(data => console.log(data));

    //first operator
    this.items$.pipe(
      first()
    ).subscribe(data => console.log('this one is from first operator - ', data));

    //last operator
    this.items$.pipe(
      last()
    ).subscribe(data => console.log('last in the items array is - ', data));


    //elementAt
    this.items$.pipe(
      elementAt(2)
    ).subscribe(data => console.log('this is at index 2 of items array - ', data));


    //filter
    this.items$.pipe(
      filter((val:any) => {
        return (val.length > 4 ? true : false)
      })
    ).subscribe(data => console.log('filtered data word length greater than 4', data));


    //distinct
    this.items$.pipe(
      distinct()
    ).subscribe(data => console.log('distinct operator - ', data));


    //skip
    this.searchForm.get('name')?.valueChanges.pipe(
      debounceTime(1000),
      skip(2)
    ).subscribe(data => console.log('skip the first two values-', data));

    this.items$.pipe(
      skip(2)
    ).subscribe(data => console.log('skipped first two elements of items array - ', data));


    //count
    this.items$.pipe(
      count()
    ).subscribe(data => console.log('length of items array is - ', data));

    this.searchForm.get('name')?.valueChanges.pipe(
      count()
    ).subscribe(data => console.log('hello from count', data));


    //max and min
    this.numberArray$.pipe(
      max()
    ).subscribe(data => console.log('maximum value ', data));

    this.numberArray$.pipe(
      min()
    ).subscribe(data => console.log('minimum value ', data));


    //map and mapTo
    this.myObs$.pipe(
      map( (val) => Number(val)+10)
    ).subscribe( data => console.log('mapped data ', data));

    this.myObs$.pipe(
      mapTo('received')
    ).subscribe(data => console.log(data)); //logs the message provided in mapTo for every value
    


    //zip and forkJoin
    zip(this.myArrObs$, this.myObs$).subscribe(([data1, data2]) => console.log('zip operator giving values from two observables:', data1, data2));

    forkJoin(this.myObs2$, this.myObs$).subscribe(([data1, data2]) => console.log('forkJoin operator:', data1, data2)); //waits for the observable to complete and gives the last values emitted by them
  }

  checkCondition(value: any){
    return value.length > 4 ? false: true;
  }

  readValue(){

  }

}
