import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BmiService } from '../../services/bmi.service';
import { Bmiresponse } from '../models/bmiresponse';
import { CreateUpateUserService } from '../../services/create-upate-user.service';
import { combineLatest } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.css']
})
export class CreateUpdateUserComponent {
  userDetails!: FormGroup
  bmiResult!: Bmiresponse;
  error: string = '';
  BMI = 0;


  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  importantList: string[] = [
    "Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Sugar Craving Body",
    "Fitness"
  ]

  constructor(private fb: FormBuilder, private bmiService: BmiService, private cdRef: ChangeDetectorRef, private userService:CreateUpateUserService) { }

  ngOnInit(): void {
    this.userDetails = this.fb.group({
      firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]], 
  weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
  height: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
  bmi: [''], 
  bmiResult: [''],
  gender: ['', Validators.required],
  requireTrainer: ['', Validators.required],
  package: ['', Validators.required],
  important: [[], Validators.required],
  haveGymBefore: ['', Validators.required],
  enquiryDate: ['', Validators.required]
    });

    combineLatest([
      this.userDetails.get('height')!.valueChanges,
      this.userDetails.get('weight')!.valueChanges
    ])
        .pipe(
      debounceTime(500), 
      filter(([height, weight]) => !!height && !!weight)
    )

    .subscribe(([height, weight]) => {
      this.calculateBMI(height, weight);
    });
  }

  submit() {
    // console.log(this.userDetails.value)
    this.userService.postRegistration(this.userDetails.value).subscribe(res=>{
      console.log(res);
      this.userDetails.reset();
    })
  }

  calculateBMI(height: number, weight: number) {
    // const height = this.userDetails.get('height')?.value;
    // const weight = this.userDetails.get('weight')?.value;
    const unit = 'metric';


    if (height && weight) {
      this.bmiService.getBmi(weight, height, unit).subscribe({
        next: (data) => {
          this.bmiResult = data;
          // this.BMI = parseFloat(this.bmiResult.bmi as any);


         this.BMI=this.bmiResult.data.bmi

          console.log(this.bmiResult.data.bmi)
          console.log('BMI Control Value:', this.userDetails.get('bmi')?.value);
          // console.log('Full Form:', this.userDetails.value);
          // this.userDetails.get('bmi')?.setValue(this.BMI);
          this.userDetails.controls['bmi'].setValue( Math.round(this.BMI * 100) / 100)
          this.userDetails.controls['bmiResult'].setValue(this.bmiResult.data.risk)
        


          console.log('BMI Result:', this.bmiResult);

        },
        error: (err) => {
          this.error = 'Failed to fetch BMI data';
          console.error(err);
        }
      });




    }
  }



}
