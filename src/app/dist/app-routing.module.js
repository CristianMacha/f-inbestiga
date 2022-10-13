"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./core/guards/auth.guard");
var error404_component_1 = require("./shared/components/error404/error404.component");
var routes = [
    {
        path: 'auth',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (auth) { return auth.AuthModule; }); }
    },
    {
        path: 'backoffice',
        canLoad: [auth_guard_1.AuthGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./backoffice/backoffice.module'); }).then(function (backoffice) { return backoffice.BackofficeModule; }); }
    },
    {
        path: '',
        redirectTo: 'backoffice',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: error404_component_1.Error404Component
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
