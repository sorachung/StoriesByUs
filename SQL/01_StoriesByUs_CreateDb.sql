USE [master]

IF db_id('StoriesByUs') IS NULL
  CREATE DATABASE [StoriesByUs]
GO

USE [StoriesByUs]
GO

DROP TABLE IF EXISTS [StoryTag];
DROP TABLE IF EXISTS [StoryGenre];
DROP TABLE IF EXISTS [Bookmark];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Genre];
DROP TABLE IF EXISTS [Chapter];
DROP TABLE IF EXISTS [Story];
DROP TABLE IF EXISTS [Rating];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [UserTypeId] int NOT NULL,
  [Bio] nvarchar(255)
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Story] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Summary] nvarchar(max) NOT NULL,
  [Notes] nvarchar(max),
  [RatingId] int NOT NULL,
  [UserId] int NOT NULL,
  [PublishedDateTime] datetime NOT NULL,
  [LastUpdatedDateTime] datetime NOT NULL,
  [Complete] bit NOT NULL
)
GO

CREATE TABLE [Chapter] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [StoryId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Body] nvarchar(max) NOT NULL,
  [PlaceInOrder] int NOT NULL,
  [Notes] nvarchar(max)
)
GO

CREATE TABLE [Genre] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [StoryGenre] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [StoryId] int NOT NULL,
  [GenreId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [StoryTag] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [StoryId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [Bookmark] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [StoryId] int NOT NULL,
  [UserId] int NOT NULL,
  [Notes] nvarchar(255)
)
GO

CREATE TABLE [Rating] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Level] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [StoryGenre] ADD FOREIGN KEY ([StoryId]) REFERENCES [Story] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [StoryGenre] ADD FOREIGN KEY ([GenreId]) REFERENCES [Genre] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [StoryTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [StoryTag] ADD FOREIGN KEY ([StoryId]) REFERENCES [Story] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Story] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Chapter] ADD FOREIGN KEY ([StoryId]) REFERENCES [Story] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Bookmark] ADD FOREIGN KEY ([StoryId]) REFERENCES [Story] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Bookmark] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Story] ADD FOREIGN KEY ([RatingId]) REFERENCES [Rating] ([Id])
GO
