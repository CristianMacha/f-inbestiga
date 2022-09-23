import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Person} from "@core/models";
import {PersonService} from "@core/services";
import {debounceTime, finalize} from "rxjs";
import {MatFormFieldAppearance} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {DialogPersonFormComponent} from "../../dialogs/dialog-person-form/dialog-person-form.component";

@Component({
  selector: 'vs-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.scss']
})
export class SearchPersonComponent implements OnInit {
  @Input() appearance: MatFormFieldAppearance = 'legacy';
  @Input() roleName: 'asesor' | 'estudiante' | 'administrador' = 'asesor';
  @Input() roleId!: number;
  @Output() person: EventEmitter<Person> = new EventEmitter<Person>();

  searchControl = new FormControl();
  options: Person[] = [];
  loading = false;
  loadResult = false;

  constructor(
    private personService: PersonService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.loadResult = false;
        if ((value as string).length > 0) {
          this.getPersonByNameAndRole(value)
        }
      })
  }

  getPersonByNameAndRole(nameValue: string): void {
    this.loading = true;
    this.loadResult = false;
    this.options = [];
    this.personService.getPersonByNameAndRole(nameValue, this.roleId)
      .pipe(finalize(() => {
        this.loading = false;
        this.loadResult = true;
      }))
      .subscribe((resp) => this.options = resp);
  }

  handleAddPerson(): void {
    const dialogRef = this.dialog.open(DialogPersonFormComponent, {
      width: '500px',
      data: {roleId: this.roleId},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((resp: Person) => resp && this.handleAdd(resp))
  }

  handleAdd(person: Person): void {
    this.searchControl.reset('');
    this.options = [];
    this.person.emit(person);
  }
}
