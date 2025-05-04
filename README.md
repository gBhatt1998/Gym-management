>>>>>>> origin/main
# Gym-management

```
gym-management/
│
├── src/
│   ├── app/
│   │   ├── user/                           # User module (static pages)
│   │   │   ├── components/
│   │   │   ├── user-routing.module.ts
│   │   │   └── user.module.ts
│   │   │
│   │   ├── admin/                          # Admin module (dashboard + auth)
│   │   │   ├── components/
│   │   │   │   ├── dashboard/              # Admin dashboard overview
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   └── dashboard.component.css
│   │   │   │   ├── user-management/        # Add, Update, Delete in one component
│   │   │   │   │   ├── user-management.component.ts
│   │   │   │   │   ├── user-management.component.html
│   │   │   │   │   └── user-management.component.css
│   │   │   │   ├── user-detail/            # View and edit individual user details
│   │   │   │   │   ├── user-detail.component.ts
│   │   │   │   │   ├── user-detail.component.html
│   │   │   │   │   └── user-detail.component.css
│   │   │   │   ├── trainer-detail/         # Manage trainer details
│   │   │   │   │   ├── trainer-detail.component.ts
│   │   │   │   │   ├── trainer-detail.component.html
│   │   │   │   │   └── trainer-detail.component.css
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── admin-routing.module.ts
│   │   │   └── admin.module.ts
│   │   │
│   │   ├── shared/                         # Shared module for common components
│   │   │   ├── components/
│   │   │   │   └── navbar/
│   │   │   │       ├── navbar.component.ts
│   │   │   │       ├── navbar.component.html
│   │   │   │       └── navbar.component.css
│   │   │   ├── pipes/
│   │   │   ├── directives/
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── core/                           # Core module (services used app-wide)
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── services/
│   │   │   └── core.module.ts
│   │   │
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   │
│   ├── assets/
│   └── index.html
│
├── angular.json
├── package.json
└── README.md
```
=======
# GymManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
>>>>>>> 6a69477 (Initial commit)
