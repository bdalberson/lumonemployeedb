const mysql = require('mysql2');
const inquirer = require('inquirer');
const menu = require('inquirer-menu');
const table = require('console.table');
 
const db = mysql.createConnection(
    {
        host: `127.0.0.1`,
        user: 'root',
        password: "",
        database: 'lumon_db'
    },
    console.log("connected to lumon db!")
);


function start_prompt() {
    lumonlogo()
    const viewAllEmployees = {
        message: 'View All Employees',
        choices: { 
            callApi: function () {
                console.log(db.query('SELECT * FROM employee;', (err, results) => {
                    console.log(results);
                    console.log(err);
                }))
                return;
            }
        }
    };

    const viewAllRoles = {
        message: 'View All Roles',
        choices: { 
            callApi: function () {
                console.log(db.query('SELECT * FROM role;', (err, results) => {
                    console.log(results);
                    console.log(err);
                }))
                return;
            }
        }
    };

    const viewAllDepartments= {
        message: 'View All Departments',
        choices: { 
            callApi: function () {
                console.log(db.query('SELECT * FROM department;', (err, results) => {
                    console.log(results);
                    console.log(err);
                }))
                return;
            }
        }
    };

    const addEmployee = {
        message: 'Add an Employee',
        choices: {
            callApi: function () {
                console.log('red-api called');
                return;
            }
        }
    };

    let level = 0;

    function createMenu() {
        return {
            message: 'main-menu level ' + level,
            choices: {
                setupData: function () {
                    level++;
                    console.log('success');

                    return;
                },
                viewAllEmployees: viewAllEmployees,
                viewAllRoles: viewAllRoles,
                viewAllDepartments: viewAllDepartments,
                addEmployee: addEmployee,

            }
        };
    };

    menu(createMenu)
        .then(function () {
            console.log('bye');
        })
        .catch(function (err) {
            console.log(err.stack);
        });
}

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

start_prompt()