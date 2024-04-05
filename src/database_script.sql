CREATE TABLE Users(
Id INT PRIMARY KEY,
Name VARCHAR(32) NOT NULL,
Email VARCHAR(32) NOT NULL,
Login VARCHAR(32) NOT NULL
)

CREATE TABLE Todos(
Id INT PRIMARY KEY,
Title VARCHAR(256) NOT NULL,
Completed BIT NOT NULL,
UserId INT REFERENCES Users(Id)
)

INSERT INTO Users (Id, Name, Email, Login) VALUES 
(1, 'Leanne Graham', 'Sincere@april.biz', 'Bret'),
(2, 'Ervin Howell', 'Shanna@melissa.tv', 'Antonette'),
(3, 'Clementine Bauch', 'Nathan@yesenia.net', 'Samantha'),
(4, 'Patricia Lebsack', 'Julianne.OConner@kory.org', 'Karianne'),
(5, 'Chelsey Dietrich', 'Lucio_Hettinger@annie.ca', 'Kamren'),
(6, 'Mrs. Dennis Schulist', 'Karley_Dach@jasper.info', 'Leopoldo_Corkery'),
(7, 'Kurtis Weissnat', 'Telly.Hoeger@billy.biz', 'Elwyn.Skiles'),
(8, 'Nicholas Runolfsdottir V', 'Sherwood@rosamond.me', 'Maxime_Nienow'),
(9, 'Glenna Reichert', 'Chaim_McDermott@dana.io', 'Delphine'),
(10, 'Clementina DuBuque', 'Rey.Padberg@karina.biz', 'Moriah.Stanton');

INSERT INTO Todos (Id, Title, Completed, UserId) VALUES 
(1, 'delectus aut autem', 0, 1),
(2, 'quis ut nam facilis et officia qui', 0, 1),
(3, 'fugiat veniam minus', 0, 1),
(4, 'et porro tempora', 1, 1),
(5, 'laboriosam mollitia et enim quasi adipisci quia provident illum', 0, 1),
(6, 'qui ullam ratione quibusdam voluptatem quia omnis', 0, 1),
(7, 'illo expedita consequatur quia in', 0, 1),
(8, 'quo adipisci enim quam ut ab', 1, 1),
(9, 'molestiae perspiciatis ipsa', 0, 1),
(10, 'illo est ratione doloremque quia maiores aut', 1, 1),
(11, 'vero rerum temporibus dolor', 1, 1),
(12, 'ipsa repellendus fugit nisi', 1, 1),
(13, 'et doloremque nulla', 0, 1),
(14, 'repellendus sunt dolores architecto voluptatum', 1, 1),
(15, 'ab voluptatum amet voluptas', 1, 1),
(16, 'accusamus eos facilis sint et aut voluptatem', 1, 1),
(17, 'quo laboriosam deleniti aut qui', 1, 1),
(18, 'dolorum est consequatur ea mollitia in culpa', 0, 1),
(19, 'molestiae ipsa aut voluptatibus pariatur dolor nihil', 1, 1),
(20, 'ullam nobis libero sapiente ad optio sint', 1, 1),
(21, 'suscipit repellat esse quibusdam voluptatem incidunt', 0, 2),
(22, 'distinctio vitae autem nihil ut molestias quo', 1, 2),
(23, 'et itaque necessitatibus maxime molestiae qui quas velit', 0, 2),
(24, 'adipisci non ad dicta qui amet quaerat doloribus ea', 0, 2),
(25, 'voluptas quo tenetur perspiciatis explicabo natus', 1, 2),
(26, 'aliquam aut quasi', 1, 2),
(27, 'veritatis pariatur delectus', 1, 2),
(28, 'nesciunt totam sit blanditiis sit', 0, 2),
(29, 'laborum aut in quam', 0, 2),
(30, 'nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis', 1, 2),
(31, 'repudiandae totam in est sint facere fuga', 0, 2),
(32, 'earum doloribus ea doloremque quis', 0, 2),
(33, 'sint sit aut vero', 0, 2),
(34, 'porro aut necessitatibus eaque distinctio', 0, 2),
(35, 'repellendus veritatis molestias dicta incidunt', 1, 2),
(36, 'excepturi deleniti adipisci voluptatem et neque optio illum ad', 1, 2),
(37, 'sunt cum tempora', 0, 2),
(38, 'totam quia non', 0, 2),
(39, 'doloremque quibusdam asperiores libero corrupti illum qui omnis', 0, 2),
(40, 'totam atque quo nesciunt', 1, 2),
(41, 'aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit', 0, 3),
(42, 'rerum perferendis error quia ut eveniet', 0, 3),
(43, 'tempore ut sint quis recusandae', 1, 3),
(44, 'cum debitis quis accusamus doloremque ipsa natus sapiente omnis', 1, 3),
(45, 'velit soluta adipisci molestias reiciendis harum', 0, 3),
(46, 'vel voluptatem repellat nihil placeat corporis', 0, 3),
(47, 'nam qui rerum fugiat accusamus', 0, 3),
(48, 'sit reprehenderit omnis quia', 0, 3),
(49, 'ut necessitatibus aut maiores debitis officia blanditiis velit et', 0, 3),
(50, 'cupiditate necessitatibus ullam aut quis dolor voluptate', 1, 3);