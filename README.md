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


## Database 
- SQL Server 
  - e.g. mysql, postrgres, oracle, mssql, sqlite, access
- NoSQL Server (Not only Sql)
  - e.g. Mongodb, couchdb, cassandra, Redis, HBase

### DB Access 
#### Mongodb 
  * Local machine
    - setup in your device  
  * Cloud hosting
    - access 
  * Table   => Collection
  * RowSet  => Document 
  - Access 
    - `protocol://[<user>:<password>@]<host>:<portNo>[[/<dbName>][?options]]`
    - `e.g. mongodb://localhost:27017`
    - `e.g. mongodb://127.0.0.1:27017`
    - `e.g. mongodb+srv://mern-79:password@clusterhost/`
  - 3 ways of accessing 
    * using shell (mongosh)
    * Mongodb Compass (GUI app)
    * Our code / applications (developer option)
#### Operations 
- CRUD 
##### Create
- Insert => 
  * Single row entry 
    -  `db.<collectionName>.insertOne(json Object)` 
  * Multiple row 
    - `db.<collectionName>.insertMany(Array or objects)`

  - e.g. users collection 
  - `db.users.insertOne({"fullName": "Sandesh Bhattarai","email": "merndeveloper.sandesh@gmail.com","password": "$2a$12$Jv7p7KhK28R/eDb8LPc2DeiDwQlf5OcxfjXm2jOGEzDvAtxgJOVjm","role": "admin","gender": "male","address": "Kathmandu","phone": "9876543210","image": {"url": "https://res.cloudinary.com/diijizcvp/image/upload/v1739163013/ecom-37/user/i0ie5wgvpzsfewuzulv5.jpg","optimizedUrl": "https://res.cloudinary.com/diijizcvp/image/upload/f_auto,q_80/v1/ecom-37/user/i0ie5wgvpzsfewuzulv5?_a=BAMCkGUq0"},"status": "inactive","activationToken": "p6wfTOH73it43AN5WZWFMxcuFCRwJhnpm9ggk1SrLNO9GZTrXUSDmQs4yAfHBP94qNWQMNm2B4ARDf8Hrh4Qc35EjDRbXqirxfbU"})`


  - e.g. users
  - `db.users.insertMany([{"fullName":"User One","email":"merndeveloper.sandesh+seller@gmail.com","password":"$2a$12$a.BDW7ulJ4i965C4BVlao.MXRA6V0/iSVku3wrHmX7oNkWzUoFOk6","role":"seller","gender":"male","address":"Lalitpur","phone":"9812345678","image":{"url":"https://res.cloudinary.com/diijizcvp/image/upload/v1739163309/ecom-37/user/p33xtvoomf70wsu3khfw.jpg","optimizedUrl":"https://res.cloudinary.com/diijizcvp/image/upload/f_auto,q_80/v1/ecom-37/user/p33xtvoomf70wsu3khfw?_a=BAMCkGUq0"},"status":"inactive","activationToken":"eW3keCdyITuuEgAR15MvHtLncuCQNyQBsCTh5jTeef9ERHR4zbKUSbtayth3xyi9POF8XCSLDD5xE7swP3G7h4PcaTGQdgqwhLrI"},{"fullName":"User Two","email":"merndeveloper.sandesh+customer@gmail.com","password":"$2a$12$a.BDW7ulJ4i965C4BVlao.MXRA6V0/iSVku3wrHmX7oNkWzUoFOk6","role":"customer","gender":"male","address":"Bhaktapur","phone":"9812345876","image":{"url":"https://res.cloudinary.com/diijizcvp/image/upload/v1739163309/ecom-37/user/p33xtvoomf70wsu3khfw.jpg","optimizedUrl":"https://res.cloudinary.com/diijizcvp/image/upload/f_auto,q_80/v1/ecom-37/user/p33xtvoomf70wsu3khfw?_a=BAMCkGUq0"},"status":"inactive","activationToken":"eW3keCdyITuuEgAR15MvHtLncuCQNyQBsCTh5jTeef9ERHR4zbKUSbtayth3xyi9POF8XCSLDD5xE7swP3G7h4PcaTGQdgqwhLrI"}])`

##### Read 
- `db.<collectionName>.findOne(filter, projection, options)`
- `db.<collectionName>.find(filter, projection, options)`
    ```json 
      { "key": "value"}   // ~ WHERE key = "value"
      {"key": "value", "key1": "value"}  // ~ WHERE key = "value" and key1 = "value"

      {"key": {"$op": <"expression">}}

      {"$op": <"expression">}

      // operator of mongodb query operator 
    ```

##### Update 
  - `db.<collectionName>.updateOne(filter, {$set: <data>}, options)`
  - `db.<collectionName>.updateMany(filter, {$set: <data>}, options)`

##### Delete
  - `db.<collectionName>.deleteOne(filter)`
  - `db.<collectionName>.deleteMany(filter)`


### Mongodb Access: 
- Shell URL: mongosh "mongodb+srv://cluster0.nss1a.mongodb.net/" --apiVersion 1 --username mern-37
- package: mongoose

### Model Definition 
- Physical Tables nodejs(ORM/ODM) => structure define/design 
* Users 
  - _id, name, email, password, role, gender, phone, address, activationToken, status, forgetPasswordToken, expiryTime, image, ceatedAt, updatedAt
* Banners/Sliders ===> SQL db for this 
* Brands 
  - _id, title, slug, logo, status, createdAt, updatedAt, createdBy, updatedBy
* Categories 
  - _id, status, createdAt, updatedAt, createdBy, updatedBy, 
  - title, slug, image, parentId
* Products 
  - _id, status, createdAt, updatedAt, createdBy, updatedBy, 
  - title, slug, price, discount, afterDiscount, detail, category, brand, seller, images, attributes, featured
  - sku, stock, manuf, exp

* Orders 
  - code, customer, orderDetails, subtotal, discount, serviceCharge, tax, total, status(pending, verified, cancelled, processing, delivered), checkoutCompleted, 
* OrderDetails(cart)
  - order, customer, product, quantity, price, discount, deliverycharge
* transactions 
  - code, order, amount, mode, refid, response, status(paid, unpaid, refund/cancelled), customer
  
* Chats
* inventories
* rate And Reviews 
* Voucher, coupons
* ....

* _id= 123, title = Motor, tools & DIY, slug=motot-tools-diy, image=null, parentId=null
* _id: 234, title = Lubricants, slug = lubricants, image=null, parentId=123
* _id: 345, title = Motorcycles, slug = motorcycles, image=null, parentId=123
* _id: 456, title = Standard Bikes, slug = standard-bikes, image=null, parentId=345
