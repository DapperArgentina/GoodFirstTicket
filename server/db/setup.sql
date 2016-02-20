--This script is to create the entire database structure

/*First we create the database and a new user.  You should update the below w/ a different pw for prod*/

CREATE DATABASE gitBegin;

CREATE USER 'gitBegin'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON gitBegin.* TO 'gitBegin'@'localhost';

/*Before running this part you need to login as the gitBegin user (or some user w/ permission on the db)*/
use gitBegin;
CREATE TABLE issues (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int NOT NULL,
  number int,
  repo_name nvarchar(50),
  org_name nvarchar(50), 
  title nvarchar(2000) NOT NULL,
  comments int,
  created_at datetime,
  updated_at datetime, 
  html_url nvarchar(255), 
  assignee nvarchar(255)
);

CREATE TABLE repos (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int NOT NULL,
  name nvarchar(100),
  org_name nvarchar(50), 
  language nvarchar(100),
  beginner_tickets int,
  description nvarchar(1000),
  stargazers_count int,
  watchers_count int, 
  has_wiki bool,
  has_pages bool, 
  open_issues int, 
  forks int,
  created_at datetime,
  updated_at datetime, 
  pushed_at datetime,
  data_refreshed_at datetime,
  record_inserted_at datetime 
);

/*Below inserts some dummy data for initial testing*/
insert into issues
(id, title, comments, created_at, updated_at, html_url, assignee, repo_key)
values (1, 'Ticket Issue Title #1', 38, NOW(), NOW(), 
'http://www.google.com', 'vince', 'react');

insert into issues
(id, title, comments, created_at, updated_at, html_url, assignee)
values (1, 'Ticket Issue Title #2', 12, NOW(), NOW(), 
'http://www.facebook.com', 'Colin','.net');

insert into repos
(id, name, language, beginner_tickets, open_issues)
values
(12312, 'React','javascript', 3, 100),
(54345, '.net','C#', 5, 20);