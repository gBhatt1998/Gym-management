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
