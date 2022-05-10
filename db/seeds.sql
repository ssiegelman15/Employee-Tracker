USE employees_db;

INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Accounting"),
       ("Maintenance"),
       ("Human Resources"),
       ("Production");

INSERT INTO roles (title,departmentId,salary)
VALUES 