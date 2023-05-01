# lumonemployeedb



| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Git | [https://git-scm.com/](https://git-scm.com/)     |    
| JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)     
| Node.JS| [https://developer.mozilla.org/en-US/docs/Glossary/Node.js?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)    
| Inquirer |:https://www.npmjs.com/package/inquirer:| 
| Mysql2 |:https://www.npmjs.com/package/mysql2:| 
| JP2A |:https://github.com/cslarsen/jp2a.:| 


## Description 
![plot](./assets/Screen%20Shot%202023-04-30%20at%207.50.10%20PM.png)

Video of the application in action: https://drive.google.com/file/d/1k0YrNf4kVxXw485En4oMGFZ3R37VN9dK/view


This is a content management system(CMS) which has a DB of employees, their roles and salaries.  Users can view and update data directly to the database. 



## Code Refactor Example


Below is the inquirer stuff thats used for navigation.  

```inquirer



function exitPrompt(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Return?',
                choices: [
                    'Exit'
                ]
            }
        ]).then (action => {
            console.clear();
            startPrompt();

        })
}

function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all Employees',
                    'View All Roles',
                    'View All Departments',
                    'Add a Department',
                    'Add a Role',
                    'Update an Employee'
                ]
            }
        ])}


Below is the fucntion for finding an employee in the database andd formating the data

``` JavaScript/MSQL

 case 'View all Employees':
                    db.query('SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', (err, results) => {
                        console.table(results);
                        console.log(err);
                    })
                    exitPrompt()
                    break;

Blow is the code for updating a role.  Lots of learning and guidances was need for this.  Working with a tutor helped a lot. 

``` Javascript


'Add a Role':
                    async function addRole() {
                        try {
                            const { title, salary, departmentID } = await inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'title',
                                    message: 'Enter a role title',
                                    validate: function (input) {
                                        if (input.length < 3) {
                                            return 'Role title must be at least 3 characters long';
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'Enter the salary for the role',
                                    validate: function (input) {
                                        if (isNaN(input)) {
                                            return 'Salary must be a number';
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'departmentID',
                                    message: 'Enter the ID of the department this role belongs to',
                                    validate: function (input) {
                                        if (isNaN(input)) {
                                            return 'Department ID must be a number';
                                        } else {
                                            return true;
                                        }
                                    }
                                }
                            ]);
                            const conn = await dbpromise.getConnection();
                            const [rows] = await conn.execute(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, departmentID]);
                            console.log(`Added ${title} into Roles`);
                            exitPrompt()



## Usage 

You will need to clone down all the repro.  Install the needed NPM packages. Then you will need to run a schema or manually insert data into the database.  Afterwards you will probably need to update the MYSQL data to have you have locally.  Then you will be able to execute the program by running "$node node.js" without the $ thats just pointing to the end of the terminal line.


## Learning Points 


Geeze learning MYSQL and how to do async functions was quite a beast. I failed and failed and failed some more untiL I was finally able to get some help and get over the hump. Also I initially built this with inquirer-menu which does not have prompts.  I had to refactor a lot of it which left me with no time to work on the bonus material.  Sad. 


## Author Info

SWEngineer with a lot of love for the show Severence. 

* [Portfolio](https://bdalberson.github.io/Course2Biopage/)
* [LinkedIn](https://www.linkedin.com/in/brian-alberson-464b2271/)
* [Github](https://github.com/bdalberson)
```

## Credits

JP2A(https://github.com/cslarsen/jp2a) was used to make the cool ascii art. Study groups, TAs, and study groups were all useful and needed to get this done.  Also the family for giving me the space and time I needed.   

---

## Tests
Just testing using Mysql workbench to verify datatables.   
