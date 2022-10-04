import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NbDateService, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/category/category.service';
import { UserService } from '../../../@service/user/user.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-user-time-sheet',
  templateUrl: './user-time-sheet.component.html',
  styleUrls: ['./user-time-sheet.component.scss']
})
export class UserTimeSheetComponent implements OnInit {

  UserTimeForm: FormGroup;
  SalaryForm: FormGroup;

  TotalHours =  [];
  constructor(
    // protected ref: NbDialogRef<UserTimeSheetComponent>,
    protected dateService: NbDateService<Date>,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private _auth: LoginService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private _mainCategory: CategoryService,
    private _user: UserService,
    private _location: Location,
  ) { }

  @Input() UserId: number;
  admin: boolean = false;
  UserDetailsName = {
    UserId: null,
    Username: null,
    UserSatrtDate: null,
    UserMaincategory: null,
    UserSubcategory: null
  }

  ngOnInit(): void {
    this.UserDetailsName.UserId = this.activatedRoute.snapshot.params.id;
    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    }

    this.UserTimeForm = this.fb.group({
      month: [null, Validators.required],
      datas: this.fb.array([]),
    });
    this.SalaryForm = this.fb.group({
      month: [null],
      year: [null],
      leaveComp: [1],
      userSalary: this.fb.group({
        userId: [this.UserDetailsName.UserId]
      })

    })

    this._user.ViewUserProfile(this.UserDetailsName.UserId).subscribe((data: any) => {
      this.UserDetailsName.Username = data.username;
      this.UserDetailsName.UserSatrtDate = data.startDate;
      this.UserDetailsName.UserMaincategory = data.categorys.categoryName;
      this.UserDetailsName.UserSubcategory = data.subCategorys.categoryName;
    })
  }

  TimeAdd(i, month, year) {
    this.AddTimeGet.push(this.AddUserTime(i, month, year));
  }
  get AddTimeGet() {
    return this.UserTimeForm.get('datas') as FormArray;
  }

  AddUserTime(i, month, year) {
    return this.fb.group({
      inTime: [null, Validators.required],
      exitTime: [null, Validators.required],
      monthChoose: [month],
      date: [i + 1],
      year: [year],
      userData: this.fb.group({
        userId: [this.UserDetailsName.UserId]
      })
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0].slice(0, -3);
  }
  getMin(): string {
    return new Date(this.UserDetailsName.UserSatrtDate).toISOString().split('T')[0].slice(0, -3);
  }

  demo(event) {
    let month = this.datepipe.transform(event, 'MMMM');
    let year = this.datepipe.transform(event, 'yyyy');
    for (let i = 0; i < 31; i++) {
      this.TimeAdd(i, month, year);
      this.TotalHours.push();

    }
    console.warn(this.TotalHours);
  }

  timezone(event) {
    let inTime = this.UserTimeForm.value.datas[event].inTime;
    let exitTime = this.UserTimeForm.value.datas[event].exitTime;
    if (inTime != null && exitTime != null) {
      inTime = inTime.replace(":", "."); 
      exitTime = exitTime.replace(":", "."); 
      let time = exitTime - inTime;
      console.warn(Math.floor( time ));
      this.TotalHours[event] = Math.floor(time);
      // this.AddTimeGet.at(event).get('hours').setValue(Math.floor(time));
    }

  }

  backClicked() {
    this._location.back();
  }


  onUserTimeFormSubmit() {
    console.warn(this.UserTimeForm.value);
    let a = this.UserTimeForm.value.datas;
    let check = 1;
    for (let i = 0; i < a.length; i++) {
      this._user.UserTime(a[i]).subscribe((data: any) => {
        console.warn(data.Data.userTimeId);
        let exitTime = { 'exitTime': (a[i].exitTime == null ? 0 : a[i].exitTime) }
        this._user.UpdateUserTime(data.Data.userTimeId, exitTime).subscribe((data: any) => {
          if (check++ == a.length) {


            this.SalaryForm.get('month').setValue(a[i].monthChoose);
            this.SalaryForm.get('year').setValue(a[i].year);
            console.warn(this.SalaryForm.value);
            this._user.CreateSalary(this.SalaryForm.value).subscribe((data: any) => {
              this.UserTimeForm.reset();
              this.allAlert('success', `Time Sheet Updated !`, 'Successfully Updated');
              this.ngOnInit();
            })

          }
        })
      })
    }
  }
  // dismiss() {
  //   this.ref.close();
  // }
  allAlert(alertMsg, headMsg, msg) {
    const config = {
      status: alertMsg,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(
      `${msg}`,
      `${headMsg}`,
      config);
  }
}
