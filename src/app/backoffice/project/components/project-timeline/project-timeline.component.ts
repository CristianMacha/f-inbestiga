import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Requirement } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  activeFormRUpdate,
  loadRequirements,
} from '../../store/project.actions';

import { AppStateProjectFeature } from '../../store/project.reducers';
import { projectFeaturePRequirements } from '../../store/project.selectors';

@Component({
  selector: 'vs-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss'],
})
export class ProjectTimelineComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;

  subscription: Subscription = new Subscription();
  requirements: Requirement[] = [];

  requirementShowCommentariesId: number = 0;

  constructor(private store: Store<AppStateProjectFeature>) {}

  ngOnInit(): void {
    this.store.dispatch(loadRequirements({ projectId: this.projectId }));
    this.getRequirements();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRequirements() {
    this.subscription.add(
      this.store
        .select(projectFeaturePRequirements)
        .subscribe((resp) => (this.requirements = resp))
    );
  }

  handleViewCommentaries(requirementId: number) {
    this.requirementShowCommentariesId = requirementId;
  }

  handleEditRequirement(requirement: Requirement) {
    window.scroll(0, 0)
    this.store.dispatch(activeFormRUpdate({ requirement }));
  }
}
