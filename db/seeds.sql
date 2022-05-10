USE employees_db;

INSERT INTO departments (departmentName)
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

INSERT INTO employee (firstName, lastName, roleId)
VALUES  ("Thomas", "Le", 1),
        ("Lauren", "Kelso", 2),
        ("Jennifer", "Wilkerson", 3),
        ("Laura", "Newsom", 4),
        ("Don", "Harberts", 5),
        ("Joseph", "Trujillo", 6),
        ("Jeremey", "Heronomus", 7),
        ("Timothy", "Crocket", 8),
        ("Barry", "Kapius", 9),
        ("Adam", "Gonzalez", 10),
        ("Samuel", "Wasserman", 11),