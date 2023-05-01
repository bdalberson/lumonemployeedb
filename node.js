const mysql = require('mysql2');
const mysqlpromise = require('mysql2/promise');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
    {
        host: `127.0.0.1`,
        user: 'root',
        password: "",
        database: 'lumon_db'
    },
    console.log("connected to lumon db!")
);

const dbpromise = mysqlpromise.createPool(
    {
        host: `127.0.0.1`,
        user: 'root',
        password: "",
        database: 'lumon_db'
    },
    console.log("connected to lumon db!")
);

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
        ])
        .then(answer => {
            switch (answer.action) {
                case 'View all Employees':
                    db.query('SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', (err, results) => {
                        console.table(results);
                        console.log(err);
                    })
                    break;
                case 'View All Roles':
                    db.query('SELECT role.id AS role_id, role.title AS job_title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;', (err, results) => {
                        console.table(results);
                        console.log(err);
                    })
                    break;
                case 'View All Departments': 

                    db.query('SELECT id, name FROM department;', (err, results) => {
                    console.table(results);
                    console.log(err);
                    })
                    break;
                case 'Add a Department':
                    async function addDepartment() {
                        try {
                          const { name } = await inquirer.prompt([{
                            type: 'input',
                            name: 'name',
                            message: 'Enter a department name',
                            validate: function (input) {
                              if (input.length < 3) {
                                return 'Department name must be at least 3 characters long';
                              } else {
                                return true;
                              }
                            }
                          }]);
                      
                          const conn = await dbpromise.getConnection();
                          const [rows] = await conn.execute('INSERT INTO department (name) VALUES (?)', [name]);
                          console.log(`Added ${name} into Departments`);
                          conn.release(); // Release the connection when done
                        } catch (err) {
                          console.error(err);
                        } finally {
                          dbpromise.end(); // End the connection pool when done
                        }
                      }
                      
                      addDepartment();

                    break;
                case 'Add a Role':
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
                            conn.release(); // Release the connection when done
                        } catch (err) {
                            console.error(err);
                        } finally {
                            dbpromise.end(); // End the connection pool when done
                        }
                    }
                    addRole();
                    break;
                case 'Update an Employee':
                    async function updateEmployee() {
                        try {
                          const [roles] = await dbpromise.execute('SELECT id, title FROM role');   //grabs roles using array destructuring
                          const [employees] = await dbpromise.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');//grabs employees and connects them with concat
                      
                          const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([  //does the prompts and waits for it to finsih before assigning variables
                            {
                              type: 'input',
                              name: 'first_name',
                              message: 'Enter the employee\'s first name:'
                            },
                            {
                              type: 'input',
                              name: 'last_name',
                              message: 'Enter the employee\'s last name:'
                            },
                            {
                              type: 'list',
                              name: 'role_id',
                              message: 'Select the employee\'s role:',
                              choices: roles.map(role => ({
                                name: role.title,
                                value: role.id
                              }))
                            },
                            {
                              type: 'list',
                              name: 'manager_id',
                              message: 'Select the employee\'s manager:',
                              choices: [
                                {
                                  name: 'None',
                                  value: null
                                },
                                ...employees.map(employee => ({
                                  name: employee.name,
                                  value: employee.id
                                }))
                              ]
                            }
                          ]);
                      
                          const [rows] = await dbpromise.execute('UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? AND last_name = ?', [ //sets the values based on the prompts the ? placeholders are variables that are
                            role_id,
                            manager_id,
                            first_name,
                            last_name
                          ]);
                      
                          console.log(`Successfully updated ${rows.affectedRows} employee record(s).`);
                        } catch (err) {
                          console.error(err);
                        } finally {
                          dbpromise.end();
                        }
                      }
                      
                      updateEmployee();
                      
                    break;
                default:
                    console.log('Invalid choice');
                    break;
            }
        });
}

lumonlogo() 
startPrompt()

function lumonlogo() {
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0xl;'.      .;cc;'      ..,cdONMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNOdc;.   .;lxd'.cONMMMMW0o,.lko:.   .,:oOXMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMNOl;;;;'..cx0WMWo'dWMMMMMMMMMMMk,:NMMKkl'..,:;,ckXMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMXd;;:dOx:,l0WMMMMW:cXMMMMMMMMMMMMMMWd,KMMMMMKd;;dkxc;;o0MMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMXd;,lOWNd,;kWMMMMMMN'dMMMMMMMMMMMMMMMMMM0.0MMMMMMM0c,cKW0o;,lKMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMM0:,lOWMNo,lXMMMMMMMMW,xMMMMMMMMMMMMMMMMMMMMX'KMMMMMMMMWd,lNMMKd;;xWMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMWx;;xNMMMk,lXMMMMMMMMMW;dMMMMMMMMMMMMMMMMMMMMMM0.XMMMMMMMMMWo'oWMMWO:,oNMMMMMMMMMMMMMM
    MMMMMMMMMMMMWx;:OMMMMNc;KMMMMMMMMMMMc:MMMMMMMMMMMMMMMMMMMMMMMMk.WMMMMMMMMMMXc,KMMMMKl,oNMMMMMMMMMMMM
    MMMMMMMMMMMO,;0MMMMMO'oMMMMMMMMMMMM0'WMMMMMMMMMMMMMMMMMMMMMMMMMolMMMMMMMMMMMMO'oWMMMMXl'dWMMMMMMMMMM
    MMMMMMMMMNc ,ooooooc ,ooooooooooooo.:ooooooooooooooooooooooooool.ooooooollllll: ;llllll; ,KMMMMMMMMM
    MMMMMMMM0,oddddddd.,dddddddddddddd,;ddddddddddddddddddddddddxxxxl.xxxxxxxxxxxxxxl oxxxxxxd,dWMMMMMMM
    MMMMMMWl'0MMMMMMMo:WMMMMMMMMMMMMMW.NMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'0MMMMMMMMMMMMMMd;WMMMMMMN:;NMMMMMM
    MMMMMW:cNMMMMMMMx;WMMMMMMMMMMMMMMd:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0'MMMMMMMMMMMMMMMd;WMMMMMMMx,XMMMMM
    MMMMN;oMMMMMMMMk'NMMMMMMMMMMMMMMM.XMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.XMMMMMMMMMMMMMMMc:MMMMMMMMO.0MMMM
    MMMN'oMMMMMMMMX.XMMMMMMMMMMMMMMMK;MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMkoMMMMMMMMMMMMMMMM;xMMMMMMMM0.0MMM
    MMM:dMMMMMMMMMd0MMMMMMMMMMMMMMMMk0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWlMMMMMMMMMMMMMMMMWcMMMMMMMMMK'NMM
    MMx:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMx;MM
    MX.NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM;kM
    McOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN,M
    W,MMMMMMMMMc;OMMMMMMMMMMN;;0MMMMMMMMO;:MM:;;dMMMMMMMMMl;;oMM0;,,,,,,,,,;kMMx;;kMMMMMMMW;;KMMMMMMMMlO
    ddMMMMMMMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM    KMMMMMMM0   .MN             KM:   dMMMMMMN  OMMMMMMMMX'
    .NMMMMMMMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM    .MMMMMMM'   .Mx      d.     lM:    dMMMMMN  OMMMMMMMMM.
    .MMMMMMMMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM  .  kMMMMMk  . .Md     ,Mo     ;M: .;  dMMMMN  OMMMMMMMMMl
    ,MMMMMMMMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM  c. .MMMMN. ;: .Md     XMN     ;M: .Wc  xMMMN  OMMMMMMMMMx
    .ooooooxMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM  cK  dMMMo  N: .Md    ;MMMd    ;M: .MMc  xMMN  OMM0oooooo:
    .xxxxxxOMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM  cMd  KMK  dM: .Md    OMMMM    ;M: .MMWo  cWN  OMMKxxxxxxc
    'MMMMMMMMMM  oMMMMMMMMMMX  xMMMMMMMMd  MM  cMM' 'W. .MM: .Md    kMMMW    ;M: .MMMMx  ,X  OMMMMMMMMMd
    .MMMMMMMMMM  oMMMMMMMMMMX  oMMMMMMMMl  MM  cMM0  ,  KMM: .Md    'WMMc    :M: .MMMMMx  '  OMMMMMMMMM:
    ;KMMMMMMMMM  ..........,W   ........  .MM  cMMM;   :MMM: .MO     .c,     dM: .MMMMMMO    OMMMMMMMMM.
    OlMMMMMMMMM             Ml            dMM  cMMMN   XMMM: .MW'           .NM: .MMMMMMMk   OMMMMMMMMO:
    M'WMMMMMMMMkxxxxxxxxxxxkMM0xxxxxxxxxx0MMMxxKMMMMOxOMMMM0xOMMWxooooooooodXMM0xkMMMMMMMMOxxNMMMMMMMM;X
    MdlMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0;M
    MW.0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN.KM
    MMK,WMMMMMMMMMKMMMMMMMMMMMMMMMMMXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKMMMMMMMMMMMMMMMMMKMMMMMMMMMMcdMM
    MMMd;WMMMMMMMMooMMMMMMMMMMMMMMMMddMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN;MMMMMMMMMMMMMMMMK;MMMMMMMMMd;MMM
    MMMMl,NMMMMMMMW'kMMMMMMMMMMMMMMMX.MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMoxMMMMMMMMMMMMMMMX.KMMMMMMMMl'NMMM
    MMMMMd,NMMMMMMMX.0MMMMMMMMMMMMMMM'0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW.NMMMMMMMMMMMMMMN'kMMMMMMMMl:NMMMM
    MMMMMMx'OMMMMMMMK,XMMMMMMMMMMMMMM0'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMdcMMMMMMMMMMMMMMW;xMMMMMMMX;cMMMMMM
    MMMMMMM0,oMMMMMMM0'KMMMMMMMMMMMMMM,0MMMMMMMMMMMMMMMMMMMMMMMMMMMMW.NMMMMMMMMMMMMMN;oMMMMMMMk'dMMMMMMM
    MMMMMMMMWc,;:::::;..;:::::::::::::'.:;;;;;;;;;;;;;;::::;;;;;;;;;'.;;;;;;;;:::::;. ;:::::;,;KMMMMMMMM
    MMMMMMMMMMk.,x00000O.,O000000000000;l00000000000000KKKKKKKKKKKKk.KKKKKKKKKKKKKl.xKKKKK0c.oWMMMMMMMMM
    MMMMMMMMMMMNo'oNMMMMNc;KMMMMMMMMMMMX.XMMMMMMMMMMMMMMMMMMMMMMMMW,OMMMMMMMMMMMWc,0MMMMWx,:KMMMMMMMMMMM
    MMMMMMMMMMMMMNl'cKMMMMk'oWMMMMMMMMMMO'NMMMMMMMMMMMMMMMMMMMMMMMc:MMMMMMMMMMWx'oWMMMNd,:0MMMMMMMMMMMMM
    MMMMMMMMMMMMMMMXd,:kWMMNc,dWMMMMMMMMMx;MMMMMMMMMMMMMMMMMMMMMMd;WMMMMMMMMMO;:KMMM0l,l0MMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMWk:,lOWM0c,dXMMMMMMMMl:WMMMMMMMMMMMMMMMMMMMd;WMMMMMMMWk;;OMMKo;;dNMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMKd;,lONKc,cOWMMMMMMl;NMMMMMMMMMMMMMMMMMl,NMMMMMMKo,;OWOl;;o0MMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMXd:;;lxl;;lOWMMMMd'xMMMMMMMMMMMMMM0;cWMMMW0d;;cdd:;;d0WMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMW0d:;;'. .:oOXMK;;OWMMMMMMMMMKc,xMNOdc.  .,;;lkNMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKkoc,.. ..;c' .ck0KX0ko, .c:'.  .':lk0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN0o:'        ..        .;cOXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)


}

// start_prompt()