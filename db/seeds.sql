USE employees_db;

INSERT INTO departments (departmentName)
VALUES  ("Engineering"),
        ("Accounting"),
        ("Maintenance"),
        ("Human Resources"),
        ("Production");

INSERT INTO roles (title,departmentId,salary)
VALUES  ("Project Engineer", 1, 100000),
        ("Engineering Intern", 1, 20000),
        ("Junior Accountant", 2, 55000),
        ("HR Business Partner", 4, 75000),
        ("Maintenance Manager", 3, 125000),
        ("Senior Accountant", 2, 95000),
        ("Production Manager", 5, 150000),
        ("Maintenance Supervisor", 3, 95000),
        ("Maintenance Technician", 3, 75000),
        ("Machine Operator", 5, 68000),
        ("Reliability Engineer", 3, 90000);

INSERT INTO employees (firstName, lastName, roleId)
VALUES  ("Thomas", "Le", 1, NULL),
        ("Lauren", "Kelso", 2, 1),
        ("Jennifer", "Wilkerson", 3, 6),
        ("Laura", "Newsom", 4, NULL),
        ("Don", "Harberts", 5, NULL),
        ("Joseph", "Trujillo", 6, NULL),
        ("Jeremey", "Heronomus", 7, NULL),
        ("Timothy", "Crocket", 8, 5),
        ("Barry", "Kapius", 9, 8),
        ("Adam", "Gonzalez", 10, 7),
        ("Samuel", "Wasserman", 11, 5),