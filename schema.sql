DROP DATABASE IF EXISTS lumon_db;
CREATE DATABASE lumon_db;

USE lumon_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT ,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL
    FOREIGN KEY department(id)
    REFERENCES department(id),
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY role_id(id)
  REFERENCES role(id),
  manager_id INT NOT NULL AUTO_INCREMENT
);






INSERT INTO movies_names (name)
VALUES ("Super Mario"),
       ("Encanto"),
       ("Little Mermaid");

INSERT INTO movies_reviews (review)
VALUES ("This was great"),
       ("Loved the songs"),
       ("Daughter loved it");