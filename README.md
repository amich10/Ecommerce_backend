# ecom-api-37
## Dependency 
- node packages managed by package.json
- command to install dependency
  - `npm install/i depName` => Setup Dependency
  - `npm install/i depName --global/-g` => Setup Global Dependency
  - `npm install/i depName --save-dev` => Setup Dev Dependency
- command to uninstall dependency
  - `npm uninstall depName`
- 3 level 
  - Global Dependency
    - within node setup 
  - Dependency (local)
    - project specific
  - Dev Dependency
    - Only for development purpose
    
### Architecture 
#### Modular architecutre
  - Folder Structure 
  - Flow 
  - Code structure 

##### Folder Structure 
  `src/ - all the source codes of express and our applications `
    `modules/ - all the modular features `
      `<featurename>/ - MVC related to that feature`
    `config/ - all the configurations of the server `
    `middlewares/ - all the common middlewares `
    `utils/ - all the utilities functions `
    `services/ - all the general or global services`
    `... - customized directories or folders/files `
  `public/ - to store all the static images/files for application `
    
  
### API Call 
- endpoint call => URL where you send your request
  - URL with a method ----> Direct to the action handle
- CRUD 
  - Create, Read, Update, Delete
  - Create => post method
  - Read =>   get method
  - Update => put/patch method
  - Delete => delete method
- Http Verbs 
- Restful services method

### Standard 
#### API Format 
* Success Response
- `json on statusCode: 200-2X => { data: <any>, message: <string>, status: <string>, options: <array|object|null>}`
* Error Response
- `json on statusCode: 4/5X => { error: <object|null>, message: <string>, status: <string>, options: <array|object|null>}`


### To be learned 
# router
# rest API
# MVC pattern
# modular pettern

200,201,204
400,401,403,404,405,408
500, 502, 503, 504


### Porject Feature - Ecommerce
* Authentication and Authorization 
* Banner/Slider
* Category
* User 
* Brand 
* Product
* Order 
* Payments 
* Chat Implement 
* Rate And Review 
* Offers, Vouchers, Coupons 
* Inventory 
* Logisitic/Delivery 
* payroll 
* Return / refunds

### Itterative development 
* Modular Development 
* Major feature - Minor feature
* Core feature first phase develop 


## Architecture 
* MVC pattern 
  - Routing ===> Model-View-Controller

## Code flow 
- Routes (/src/config/router.config.js) ===> module/router (src/modules/<module>/<module>.router.js) ===> Middleware(optional) ====> controller (src/modules/<module>/<module>.controller.js) =====> service (src/modules/<modules>/<module>.service.js or src/services/<service>.service.js) ====> Model(DB operations, src/modules/<module>/<module>.model.js)
                                                                                                     ===> Middleware(optional) ====> Respond to client (end)
`src/`
  `modules/  ---- to store all modules`
    `feature/`
      `feature.router.js`
      `feature.controller.js`
      `feature.service.js`
      `feature.model.js`
      `feature.validators.js`
  `services/  ---- to store all services`
  `config/  ---- to store all configurataion`
`public/  --- used for file upload`

### Feature: Authentication and Authorization 
- This feature will handle all the login, registration,logout, forget-password, reset-password, activation and user roles and permissions
* Routes: 
  * Registration    -> post method,   url: /auth/register
  * Activate        -> get method,    url: /auth/activate/:token
  * Login           -> post method,   url: /auth/login
  * Logged In User  -> get method,    url: /auth/me
  * Logou(option)   -> get method,    url: /auth/logout (no need to develop)
  * Forget password -> post method,   url: /auth/forget-password
  * Password reset  -> patch method,  url: /auth/password-reset/:token

### Feature: Banner/Slider
- This feature will allow an admin user to perform CRUD with banner/slider 
* Routes 
  * Create          -> post method,     url: /banner
  * List all        -> get method,      url: /banner
  * View Detail     -> get method,      url: /banner/:id
  * Update          -> patch method,    url: /banner/:id
  * Delete          -> delete method,   url: /banner/:id
