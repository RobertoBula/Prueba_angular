import { Injectable } from '@angular/core';
import { Excel } from '../utils/excel';
import { findMinAndMaxState } from '../utils/min-max-state';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor() { }

  getFile(event: any): void{
    const file = event.target.files[0];
    Excel.convertExcelToArray(file, (result) => {
      console.log(result);
    
      console.log(findMinAndMaxState(result))
    })
  }

}
