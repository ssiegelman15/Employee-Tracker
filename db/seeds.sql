USE employees_db;

INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Accounting"),
       ("Maintenance"),
       ("Human Resources"),
       ("Production");

INSERT INTO roles (title,departmentId,salary)
VALUES ("Project Engineer", 1, 100000),
       ("Engineering Intern", 1, 20000),
       ("Junior Accountant", 2, 55000),
       ("HR Business Partner", 4, 75000),
       ("Maintenance Manager", 3, 125000),
       ("Senior Accountant", 2, 95000),
       ("Production Manager", 5, 150000),
       ("Maintenance Supervisor", 3, 95000),
       ("Maintenance Technician", 3, 75000),
       ("Machine Operator", 5, 68000),
       ("Reliability Engineer", 1, 90000);

