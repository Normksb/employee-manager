DROP DATABASE IF EXISTS employee_manager;

create database employee_manager;

USE employee_manager;

CREATE TABLE departments (
	dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (dept_id)
);

CREATE TABLE roles (
	role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (role_id),
    CONSTRAINT fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES departments(dept_id)
);

CREATE TABLE employees (
	emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (emp_id),
    CONSTRAINT fk_role_id
    FOREIGN KEY (role_id)
	REFERENCES roles(role_id),
    CONSTRAINT fk_manager_id
    FOREIGN KEY (manager_id)
    REFERENCES employees(emp_id)
);

INSERT INTO departments (dept_name)
VALUES
	('Dept of Silly Walks'),
    ('Dept of Milk and Honey'),
    ('Dept of Convivial Imbibery');

INSERT INTO roles (title, salary, department_id)
VALUES
	('Director Silly Walks', '110000', 1),
    ('Grant Applicant', '40000', 1),
    ('MH Manager', '75000', 2),
    ('Office Pleb', '30000', 2),
    ('Head Drunk', '45000', 3),
    ('Boozy Intern', '25000', 3);
    
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
	('John', 'Cleese', 1, NULL),
    ('Michael', 'Palin', 2, 1),
    ('Amanda', 'Huginkis', 3, NULL),
    ('Oliver', 'Klozoff', 4, 3),
    ('Al', 'Coholic', 5, NULL),
    ('Jacques', 'Strap', 6, 5);
    
select * from departments;

select * from roles;

select * from employees;