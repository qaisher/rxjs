import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { elementAt, first, last, Observable } from 'rxjs';
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

  items = ['mouse', 'keyboard', 'scanner', 'printer'];
  items$: Observable<string> = from(this.items);

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
      take(2)
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

  }

  checkCondition(value: any){
    return value.length > 4 ? false: true;
  }

  readValue(){

  }

}
