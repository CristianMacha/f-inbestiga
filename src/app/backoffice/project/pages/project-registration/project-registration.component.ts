import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CRole } from '@core/enums';
import { Category, Fee, PaymentModel, Person, PersonProject } from '@core/models';
import { CategoryService, FeeService, InvoiceService, PersonProjectService, ProjectService } from '@core/services';
import * as moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.scss']
})
export class ProjectRegistrationComponent implements OnInit {
  projectForm = new UntypedFormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    category: new UntypedFormGroup({
      id: new FormControl('select', [Validators.required, Validators.min(0)]),
    }, Validators.required),
    startDate: new FormControl(),
    expirationDate: new FormControl('', Validators.required),
    description: new FormControl(''),
    otherCategory: new FormControl(''),
  });
  showOtherCategory = false;

  invoiceForm = new UntypedFormGroup({
    id: new FormControl(0),
    total: new FormControl(0, [Validators.required, Validators.min(6)]),
    feesNumber: new FormControl(1),
  });

  feeForm = new UntypedFormGroup({
    fees: new UntypedFormArray([])
  });

  fees: FormControl[] = [];
  cRole = CRole;

  advisors: PersonProject[] = [];
  students: PersonProject[] = [];
  categories: Category[] = [];
  loading = false;
  btnText = 'registrar proyecto';

  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private personProjectService: PersonProjectService,
    private invoiceService: InvoiceService,
    private feeService: FeeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.valueChangesCategory();
    this.valueChangeInvoice();
  }

  get feesFormArray(): UntypedFormArray {
    return this.feeForm.controls['fees'] as UntypedFormArray;
  }

  get totalInvoice(): number {
    return this.invoiceForm.controls['total'].value;
  }

  get feesNumberInvoice(): number {
    return this.invoiceForm.controls['feesNumber'].value;
  }

  handleRegisterProject(): void {
    this.loading = true;
    this.projectService.create({
      project: this.projectForm.value,
      invoice: this.invoiceForm.value,
      advisors: this.advisors,
      students: this.students,
      fees: this.feeForm.controls['fees'].value
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.router.navigateByUrl('backoffice/project'))
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((resp) => this.categories = resp);
  }

  addFee(): void {
    const newFee = this.createFeeForm();
    const feesNumber = this.feesNumberInvoice;
    this.invoiceForm.controls['feesNumber'].patchValue(feesNumber + 1);
    this.feesFormArray.push(newFee);
  }

  removeFee(index: number, fee: AbstractControl) {
    this.feesFormArray.removeAt(index);
    const feeNumbers = this.feesNumberInvoice - 1;
    this.invoiceForm.controls['feesNumber'].patchValue(feeNumbers);
  }

  createFeeForm(feeValue?: Fee): FormGroup {
    const fee = this.builder.group({
      id: new FormControl((feeValue?.id || 0)),
      total: new UntypedFormControl((feeValue?.total || ''), Validators.required),
      numberFee: new UntypedFormControl(feeValue?.numberFee || 0, Validators.required),
      paymentDate: new UntypedFormControl((feeValue?.paymentDate || ''), [Validators.required]),
      active: new FormControl((feeValue?.active || true))
    });

    return fee;
  }

  setPerson(isAdvisor: boolean, person: Person): void {
    const newPersonProject = new PersonProject();
    newPersonProject.person = person;
    newPersonProject.isAdvisor = isAdvisor;
    newPersonProject.active = true;
    isAdvisor ? this.addAdvisor(newPersonProject) : this.addStudent(newPersonProject);
  }

  addAdvisor(advisor: PersonProject): void {
    const advisorIndex = this.advisors.findIndex((pa) => pa.person.id == advisor.person.id);
    if (advisorIndex < 0) {
      const newAdvisorProject = new PersonProject();
      newAdvisorProject.id = advisor.id;
      newAdvisorProject.active = advisor.active;
      newAdvisorProject.isAdvisor = advisor.isAdvisor;
      newAdvisorProject.person = advisor.person;
      this.advisors.push(newAdvisorProject);
    }
  }

  removeAdvisor(index: number, advisor: PersonProject): void {
    this.advisors.splice(index, 1);
  }

  removeStudent(index: number, student: PersonProject): void {
    this.students.splice(index, 1);
  }

  addStudent(student: PersonProject): void {
    const studentIndex = this.students.findIndex((ps) => ps.person.id == student.person.id);
    if (studentIndex < 0) {
      const newStudentProject = new PersonProject();
      newStudentProject.id = student.id;
      newStudentProject.active = student.active;
      newStudentProject.isAdvisor = student.isAdvisor;
      newStudentProject.person = student.person;
      this.students.push(newStudentProject);
    }
  }

  clearFeesFormArray(): void {
    this.feesFormArray.clear();
  }

  valueChangesCategory(): void {
    const categoryControl = (this.projectForm.controls['category'] as UntypedFormGroup).controls['id'];
    categoryControl.valueChanges.subscribe((id) => {
      if (id == 0) {
        this.showOtherCategory = true;
      } else {
        this.showOtherCategory = false;
      }
    });
  }

  valueChangeInvoice(): void {
    this.invoiceForm.valueChanges.subscribe((resp) => {
      this.invoiceForm.invalid ? this.feesFormArray.clear() : this.calculateFee(resp.total, resp.feesNumber);
    });
  }

  private calculateFee(invoiceTotal: number, feesNumber: number): void {
    this.feesFormArray.clear();
    const totalFee = invoiceTotal / feesNumber;
    const newFee = new Fee();
    newFee.total = Math.round(totalFee);

    const currentDate = moment();
    for (let index = 0; index < feesNumber; index++) {
      newFee.paymentDate = currentDate.clone().add(index, 'month').toDate();
      newFee.numberFee += 1;
      this.feesFormArray.push(this.createFeeForm(newFee));
    }
  }

  handleCloseOtherCategory(): void {
    this.showOtherCategory = false;
    (this.projectForm.controls['category'] as UntypedFormGroup).controls['id'].patchValue(0);
    this.projectForm.controls['otherCategory'].reset('');
  }

  getPersonProject(projectId: number): void {
    this.loading = true;
    this.personProjectService.getByProject(projectId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        resp.forEach((pp) => (pp.isAdvisor) ? this.addAdvisor(pp) : this.addStudent(pp));
      });
  }

  getInvoice(projectId: number): void {
    this.loading = true;
    this.invoiceService.getByProject(projectId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.invoiceForm.patchValue(resp[0]))
  }

  getFees(projectId: number): void {
    this.loading = true;
    this.feeService.getByProject(projectId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        resp.forEach((fee) => {
          const newFeeForm = this.createFeeForm(fee);
          (this.feeForm.controls['fees'] as FormArray).push(newFeeForm);
        })
      })
  }


  gotToProject(): void {
    this.router.navigateByUrl('backoffice/project');
  }
}
