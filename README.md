# Employee Manager
 
  
  ![alt text](./images/screenshot.PNG)
  
[Here is a link to the gitHub repo](https://github.com/Normksb/employee-manager)  

![AUR license](https://img.shields.io/static/v1?label=License&message=MIT&color=blue)

## Description
This Application is a command line interface employee database manager. It allows a manager to maintain a database of employees, roles and departments.


---
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Technologies](#technologies)
- [Questions](#questions)

---
## Installation  
  
Please follow these steps to install the project and any dependancies locally.

```bash
install node.js
clone the repo from gitHub
npm install
 
```

In order to run the app you will need to configure the following environment variables (dotenv is included in the package dependencies for this purpose);

for MYSQL
- DB_NAME  // database name
- DB_HOST  // network address/hostname of MYSQL server
- DB_USER  // MYSQL username
- DB_PASS  // MYSQL password

Once you have configured your environment variables you may populate your database using the sql script provided "employeeManagerSeeds.sql" found in the root directory of the repo.


---
## Usage

 
To start application please use the start script already found in the package.json as follows;

```bash
npm start
```
The following video demonstrates use of the application;

[video demonstration of the application](https://github.com/Normksb/employee-manager)  

---
## License

This project is licensed under ![AUR license](https://img.shields.io/static/v1?label=License&message=MIT&color=blue)

---
## Contributing

Contributing to this project is not currently available.


---

## Technologies


- Node JS
- MySQL
- Inquirer (node library)
- MYSQL2 (node library)

---

## Questions

For any questions and support please contact Norman Bernard.  
- Email: nksb414@gmail.com
- Github: [Norman Bernard](https://github.com/Normksb)