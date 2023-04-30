DROP DATABASE IF EXISTS lumon_db;
CREATE DATABASE lumon_db;

USE lumon_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
    REFERENCES role(id),
  FOREIGN KEY (manager_id)
    REFERENCES employee(id),
  CONSTRAINT foreign_role
    FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT foreign_manager
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);






INSERT INTO department (name)
VALUES ("Macrodata Refinement"),
       ("Optics and Design"),
       ("Wellness Director"),
       ("Security"),
       ("CEO");


INSERT INTO role(title, salary)
VALUES ("Refiner", 120000),
    ("Manager", 140000),
    ("Designer", 120000),
    ("Therapist", 160000),
    ("Guard", 100000),
    ("CEO", 500000);
       


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("Mark", "S", 1, 5),
    ("Helly", "R", 1, 5),
    ("Dylan", "G", 1, 5),
    ("Doug", "Grander", 4, 7),
    ("Seth", "Milchick", 1, 7),
    ("Judd", "Z", 5, 4),
    ("Harmony", "Cobel", 2, 17),
    ("Irving", "Bailiff", 1, 7),
    ("Burt", "Goodman", 2, 5),
    ("Gemma", "Casey", 3, 7),
    ("Natalie", "A", 1, 17),
    ("Peter", "Kilmer", 1, 5),
    ("Kier", "Eagan", 5, 17),
    ("Ambrose", "Eagan", 5, 17),
    ("Baird", "Eagan", 5, 17),
    ("Leonora", "Eagan", 5, 17),
    ("Phillip", "Eagan", 5, 17),
    ("Jame"