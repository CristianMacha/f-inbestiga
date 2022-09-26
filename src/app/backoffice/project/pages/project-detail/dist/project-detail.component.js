"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectDetailComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var models_1 = require("@core/models");
var enums_1 = require("@core/enums");
var project_actions_1 = require("../../store/project.actions");
var project_selectors_1 = require("../../store/project.selectors");
var ui_selectors_1 = require("../../../../shared/ui.selectors");
var dialog_accept_project_component_1 = require("../../../../shared/dialogs/dialog-accept-project/dialog-accept-project.component");
var dialog_confirm_component_1 = require("../../../../shared/dialogs/dialog-confirm/dialog-confirm.component");
var dialog_project_update_doc_component_1 = require("../../../../../app/shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component");
var ProjectDetailComponent = /** @class */ (function () {
    function ProjectDetailComponent(activatedRoute, store, router, invoiceService, matDialog, projectService, snackBar) {
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.router = router;
        this.invoiceService = invoiceService;
        this.matDialog = matDialog;
        this.projectService = projectService;
        this.snackBar = snackBar;
        this.subscription = new rxjs_1.Subscription();
        this.projectId = 0;
        this.project = new models_1.Project();
        this.cProjectStatus = enums_1.CProjectStatus;
        this.invoices = [];
        this.activeFormR = false;
        this.roleSelected = new models_1.Role();
        this.cRole = enums_1.CRole;
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getActiveFormState();
        this.activatedRoute.params.subscribe(function (resp) {
            _this.projectId = parseInt(resp['id']);
            _this.getProject(_this.projectId);
            _this.getInvoices(_this.projectId);
        });
        this.getRoleSelectedState();
    };
    ProjectDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProjectDetailComponent.prototype.handleAccept = function () {
        var _this = this;
        var dialogRef = this.matDialog.open(dialog_accept_project_component_1.DialogAcceptProjectComponent, {
            width: '600px',
            data: { projectId: this.projectId },
            autoFocus: false,
            disableClose: true
        });
        this.subscription.add(dialogRef.afterClosed().subscribe(function (resp) {
            if (resp) {
                _this.getInvoices(_this.projectId);
            }
        }));
    };
    ProjectDetailComponent.prototype.handleRefuse = function () {
        var _this = this;
        var data = {
            title: 'Rechazar',
            description: 'Esta seguro de rachazar este proyecto?',
            action: 'Rechazar',
            accept: false
        };
        var dialogRef = this.matDialog.open(dialog_confirm_component_1.DialogConfirmComponent, { width: '300px', data: data, autoFocus: false });
        this.subscription.add(dialogRef.afterClosed().subscribe(function (resp) { return resp && _this.refuseProject(); }));
    };
    ProjectDetailComponent.prototype.refuseProject = function () {
        var _this = this;
        this.projectService.refuse(this.projectId)
            .subscribe({
            next: function (resp) {
                _this.store.dispatch(project_actions_1.loadProject({ projectId: resp.id }));
                _this.snackBar.openTopEnd('Proyecto rechazdo');
            },
            error: function (e) { return _this.snackBar.openTopEnd('Algo salio mal.'); }
        });
    };
    ProjectDetailComponent.prototype.getProject = function (projectId) {
        var _this = this;
        this.projectService.getProject(projectId, false)
            .subscribe({
            next: function (resp) {
                !resp && _this.router.navigateByUrl('backoffice/project');
                _this.project = resp;
                _this.statusActive = resp.active;
                _this.getProject(_this.projectId);
            },
            error: function () { return _this.router.navigateByUrl('backoffice/project'); }
        });
    };
    ProjectDetailComponent.prototype.handleUploadUpdate = function () {
        var _this = this;
        var dialogRef = this.matDialog.open(dialog_project_update_doc_component_1.DialogProjectUpdateDocComponent, {
            width: '300px',
            data: { projectId: this.projectId },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (resp) { return resp && _this.getProject(_this.projectId); });
    };
    ProjectDetailComponent.prototype.handleBtnToggleActiveProject = function (confirm) {
        var _this = this;
        var data = {
            accept: confirm,
            title: confirm ? 'Habilitar proyecto' : 'Desabilitar Proyecto',
            description: "",
            action: confirm ? 'Habilitar proyecto' : 'Desabilitar Proyecto'
        };
        var dialogRef = this.matDialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
            width: '400px',
            data: data
        });
        dialogRef.afterClosed().subscribe(function (resp) {
            if (resp) {
                _this.updateProjectActive();
            }
        });
    };
    ProjectDetailComponent.prototype.updateProjectActive = function () {
        var _this = this;
        this.projectService.updateActive(this.projectId).subscribe(function (resp) { return resp && _this.getProject(_this.projectId); });
    };
    ProjectDetailComponent.prototype.handleBtnArrowBack = function () {
        this.router.navigateByUrl('backoffice/project');
    };
    ProjectDetailComponent.prototype.dispatchProjects = function () {
        var _this = this;
        this.subscription.add(this.activatedRoute.params.subscribe(function (resp) {
            _this.projectId = parseInt(resp['id']);
            _this.getInvoices(_this.projectId);
            _this.store.dispatch(project_actions_1.loadProject({ projectId: _this.projectId }));
        }));
    };
    ProjectDetailComponent.prototype.getRoleSelectedState = function () {
        var _this = this;
        this.subscription.add(this.store.select(ui_selectors_1.uiRoleSelected).subscribe(function (resp) { return _this.roleSelected = resp; }));
    };
    ProjectDetailComponent.prototype.getActiveFormState = function () {
        var _this = this;
        this.subscription.add(this.store
            .select(project_selectors_1.projectFeatureActiveFormR)
            .subscribe(function (resp) { return (_this.activeFormR = resp); }));
    };
    ProjectDetailComponent.prototype.getInvoices = function (projectId) {
        var _this = this;
        this.invoiceService.getByProject(projectId)
            .subscribe(function (resp) { return _this.invoices = resp; });
    };
    ProjectDetailComponent = __decorate([
        core_1.Component({
            selector: 'vs-project-detail',
            templateUrl: './project-detail.component.html',
            styleUrls: ['./project-detail.component.scss']
        })
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
