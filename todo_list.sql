DROP DATABASE IF EXISTS todo_list;
CREATE DATABASE todo_list;
USE todo_list;

-- USERS
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    system_id VARCHAR(20) UNIQUE,
    username VARCHAR(100) NOT NULL,
    phonenumber VARCHAR(20),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    city VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO users (username,email,password,role) VALUES
('Admin','admin@gmail.com','admin123','admin'),
('Rahul','rahul@gmail.com','rahul123','user'),
('Priya','priya@gmail.com','priya123','user');

-- PROJECTS
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Not Started','In Progress','Review','Completed') DEFAULT 'Not Started',
    priority ENUM('Low','Medium','High') DEFAULT 'Medium',
    start_date DATE,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (name,status,priority)
VALUES ('Website Redesign','In Progress','High');

-- TASKS
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('NOT_STARTED','IN_PROGRESS','IN_REVIEW','DONE') DEFAULT 'NOT_STARTED',
    priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'MEDIUM',
    due_date DATETIME,
    project_id INT,
    assignee_id INT NOT NULL,
    created_by_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL,
    FOREIGN KEY (assignee_id) REFERENCES users(userid) ON DELETE CASCADE,
    FOREIGN KEY (created_by_id) REFERENCES users(userid) ON DELETE CASCADE
);

INSERT INTO tasks (title,description,status,priority,project_id,assignee_id,created_by_id)
VALUES
('Design Landing Page','UI work','IN_PROGRESS','HIGH',1,2,1),
('API Integration','Backend APIs','NOT_STARTED','MEDIUM',1,3,1),
('Fix Login Bug','Auth issue','IN_REVIEW','HIGH',1,2,1);

-- TAGS
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT IGNORE INTO tags (name)
VALUES ('Urgent'),('Bug'),('UI'),('Backend');

-- TASK_TAGS (NO HARD-CODED IDS)
CREATE TABLE task_tags (
    task_id INT,
    tag_id INT,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

INSERT INTO task_tags (task_id, tag_id)
SELECT t.id, g.tag_id
FROM tasks t JOIN tags g
WHERE t.title='Design Landing Page' AND g.name IN ('Urgent','UI');

INSERT INTO task_tags (task_id, tag_id)
SELECT t.id, g.tag_id
FROM tasks t JOIN tags g
WHERE t.title='API Integration' AND g.name='Backend';

INSERT INTO task_tags (task_id, tag_id)
SELECT t.id, g.tag_id
FROM tasks t JOIN tags g
WHERE t.title='Fix Login Bug' AND g.name IN ('Urgent','Bug');

-- SUBTASKS (FK SAFE)
CREATE TABLE subtasks (
    subtask_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    task_id INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

INSERT INTO subtasks (title,task_id)
SELECT 'Create wireframe', id FROM tasks WHERE title='Design Landing Page'
UNION ALL
SELECT 'Fix auth flow', id FROM tasks WHERE title='Fix Login Bug';

-- COMMENTS
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    task_id INT,
    user_id INT,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(userid) ON DELETE CASCADE
);

INSERT INTO comments (content,task_id,user_id)
SELECT 'Looks good', id, 1 FROM tasks WHERE title='Design Landing Page';
