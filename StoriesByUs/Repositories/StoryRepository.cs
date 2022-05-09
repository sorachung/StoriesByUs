using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class StoryRepository : BaseRepository, IStoryRepository
    {
        public StoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Story> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             ORDER BY s.LastUpdatedDateTime DESC;";


                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var storyId = DbUtils.GetInt(reader, "sId");
                        var existingStory = stories.FirstOrDefault(s => s.Id == storyId);
                        if (existingStory == null)
                        {
                            existingStory = new Story()
                            {
                                Id = storyId,
                                Title = DbUtils.GetString(reader, "Title"),
                                Summary = DbUtils.GetString(reader, "Summary"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                PublishedDateTime = DbUtils.GetDateTime(reader, "PublishedDateTime"),
                                LastUpdatedDateTime = DbUtils.GetDateTime(reader, "LastUpdatedDateTime"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Rating = new Rating()
                                {
                                    Id = DbUtils.GetInt(reader, "RatingId"),
                                    Level = DbUtils.GetString(reader, "Level")
                                },
                                Genres = new List<Genre>(),
                                Tags = new List<Tag>(),
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                            stories.Add(existingStory);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingStory.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingStory.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingStory.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingStory.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingStory.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingStory.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                });
                            }

                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (existingStory.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                existingStory.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return stories;
                }
            }
        }

        public List<Story> GetByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             WHERE s.Id in 
                                            (SELECT s.Id 
                                                FROM Story s
                                                LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                                WHERE u.Id= @id)
                             ORDER BY s.LastUpdatedDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var storyId = DbUtils.GetInt(reader, "sId");
                        var existingStory = stories.FirstOrDefault(s => s.Id == storyId);
                        if (existingStory == null)
                        {
                            existingStory = new Story()
                            {
                                Id = storyId,
                                Title = DbUtils.GetString(reader, "Title"),
                                Summary = DbUtils.GetString(reader, "Summary"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                PublishedDateTime = DbUtils.GetDateTime(reader, "PublishedDateTime"),
                                LastUpdatedDateTime = DbUtils.GetDateTime(reader, "LastUpdatedDateTime"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Rating = new Rating()
                                {
                                    Id = DbUtils.GetInt(reader, "RatingId"),
                                    Level = DbUtils.GetString(reader, "Level")
                                },
                                Genres = new List<Genre>(),
                                Tags = new List<Tag>(),
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                            stories.Add(existingStory);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingStory.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingStory.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingStory.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingStory.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingStory.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingStory.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                });
                            }

                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (existingStory.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                existingStory.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return stories;
                }
            }
        }

        public List<Story> GetByGenre(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             WHERE s.Id in 
                                            (SELECT s.Id 
                                                FROM Story s
                                                LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                                WHERE sg.GenreId = @id)
                             ORDER BY s.LastUpdatedDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var storyId = DbUtils.GetInt(reader, "sId");
                        var existingStory = stories.FirstOrDefault(s => s.Id == storyId);
                        if (existingStory == null)
                        {
                            existingStory = new Story()
                            {
                                Id = storyId,
                                Title = DbUtils.GetString(reader, "Title"),
                                Summary = DbUtils.GetString(reader, "Summary"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                PublishedDateTime = DbUtils.GetDateTime(reader, "PublishedDateTime"),
                                LastUpdatedDateTime = DbUtils.GetDateTime(reader, "LastUpdatedDateTime"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Rating = new Rating()
                                {
                                    Id = DbUtils.GetInt(reader, "RatingId"),
                                    Level = DbUtils.GetString(reader, "Level")
                                },
                                Genres = new List<Genre>(),
                                Tags = new List<Tag>(),
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                            stories.Add(existingStory);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingStory.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingStory.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingStory.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingStory.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingStory.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingStory.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                }); 
                            }

                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (existingStory.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                existingStory.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return stories;
                }
            }
        }

        public List<Story> GetByTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             WHERE s.Id in 
                                            (SELECT s.Id 
                                                FROM Story s
                                                LEFT JOIN StoryTag st ON st.StoryId = s.Id
                                                WHERE st.TagId = @id)
                             ORDER BY s.LastUpdatedDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var storyId = DbUtils.GetInt(reader, "sId");
                        var existingStory = stories.FirstOrDefault(s => s.Id == storyId);
                        if (existingStory == null)
                        {
                            existingStory = new Story()
                            {
                                Id = storyId,
                                Title = DbUtils.GetString(reader, "Title"),
                                Summary = DbUtils.GetString(reader, "Summary"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                PublishedDateTime = DbUtils.GetDateTime(reader, "PublishedDateTime"),
                                LastUpdatedDateTime = DbUtils.GetDateTime(reader, "LastUpdatedDateTime"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Rating = new Rating()
                                {
                                    Id = DbUtils.GetInt(reader, "RatingId"),
                                    Level = DbUtils.GetString(reader, "Level")
                                },
                                Genres = new List<Genre>(),
                                Tags = new List<Tag>(),
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                            stories.Add(existingStory);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingStory.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingStory.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingStory.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingStory.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingStory.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingStory.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                });
                            }

                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (existingStory.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                existingStory.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return stories;
                }
            }
        }

        public Story Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          c.Id AS ChapterId, c.PlaceInOrder, c.WordCount, c.Title AS ChapterTitle,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             WHERE s.Id in 
                                            (SELECT s.Id 
                                                FROM Story s
                                                LEFT JOIN StoryTag st ON st.StoryId = s.Id
                                                WHERE s.Id = @id)
                             ORDER BY s.LastUpdatedDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Story story = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (story == null)
                        {
                            story = new Story()
                            {
                                Id = DbUtils.GetInt(reader, "sId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Summary = DbUtils.GetString(reader, "Summary"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                PublishedDateTime = DbUtils.GetDateTime(reader, "PublishedDateTime"),
                                LastUpdatedDateTime = DbUtils.GetDateTime(reader, "LastUpdatedDateTime"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Rating = new Rating()
                                {
                                    Id = DbUtils.GetInt(reader, "RatingId"),
                                    Level = DbUtils.GetString(reader, "Level")
                                },
                                Genres = new List<Genre>(),
                                Tags = new List<Tag>(),
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (story.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                story.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (story.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                story.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (story.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                story.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount"),
                                    Title = DbUtils.GetString(reader, "ChapterTitle")
                                });
                            }

                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (story.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                story.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return story;
                }
            }
        }

        public void Add(Story story)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Story (Title, Summary, Notes, RatingId, UserId, PublishedDateTime, LastUpdatedDateTime, Complete)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Summary, @Notes, @RatingId, @UserId, @PublishedDateTime, @LastUpdatedDateTime, @Complete)";

                    DbUtils.AddParameter(cmd, "@Title", story.Title);
                    DbUtils.AddParameter(cmd, "@Summary", story.Summary);
                    DbUtils.AddParameter(cmd, "@Notes", story.Notes);
                    DbUtils.AddParameter(cmd, "@RatingId", story.Rating.Id);
                    DbUtils.AddParameter(cmd, "@UserId", story.User.Id);
                    DbUtils.AddParameter(cmd, "@PublishedDateTime", story.PublishedDateTime);
                    DbUtils.AddParameter(cmd, "@LastUpdatedDateTime", story.LastUpdatedDateTime);
                    DbUtils.AddParameter(cmd, "@Complete", story.Complete);

                    story.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void AddStoryTags(int storyId, List<int> tagIds)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO StoryTag (StoryId, TagId)
                        VALUES (@StoryId, @TagId0)";


                    for(var i = 1; i < tagIds.Count; i++)
                    {
                        cmd.CommandText += $", (@StoryId, @TagId{i}) ";
                    };

                    for (var i = 0; i < tagIds.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@TagId{i}", tagIds[i]);

                    }
                    DbUtils.AddParameter(cmd, "@StoryId", storyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddStoryGenres(int storyId, List<int> genreIds)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO StoryGenre (StoryId, GenreId)
                        VALUES (@StoryId, @GenreId0)";

                    for (var i = 1; i < genreIds.Count; i++)
                    {
                        cmd.CommandText += $", (@StoryId, @GenreId{i}) ";
                    };

                    for (var i = 0; i < genreIds.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@GenreId{i}", genreIds[i]);

                    }
                    DbUtils.AddParameter(cmd, "@StoryId", storyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(Story story)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         UPDATE Story
                            SET Title = @Title,
                                Summary = @Summary,
                                Notes = @Notes,
                                RatingId = @RatingId,
                                Complete = @Complete
                          WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", story.Title);
                    DbUtils.AddParameter(cmd, "@Summary", story.Summary);
                    DbUtils.AddParameter(cmd, "@Notes", story.Notes);
                    DbUtils.AddParameter(cmd, "@RatingId", story.Rating.Id);
                    DbUtils.AddParameter(cmd, "@Complete", story.Complete);
                    DbUtils.AddParameter(cmd, "@Id", story.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditStoryTags(int storyId, List<int> tagIds)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM StoryTag WHERE StoryId = @storyId;
                        INSERT INTO StoryTag (StoryId, TagId)
                        VALUES (@StoryId, @TagId0)";


                    for (var i = 1; i < tagIds.Count; i++)
                    {
                        cmd.CommandText += $", (@StoryId, @TagId{i}) ";
                    };

                    for (var i = 0; i < tagIds.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@TagId{i}", tagIds[i]);

                    }
                    DbUtils.AddParameter(cmd, "@StoryId", storyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditStoryGenres(int storyId, List<int> genreIds)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM StoryGenre WHERE StoryId = @storyId;
                        INSERT INTO StoryGenre (StoryId, GenreId)
                        VALUES (@StoryId, @GenreId0)";

                    for (var i = 1; i < genreIds.Count; i++)
                    {
                        cmd.CommandText += $", (@StoryId, @GenreId{i}) ";
                    };

                    for (var i = 0; i < genreIds.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@GenreId{i}", genreIds[i]);

                    }
                    DbUtils.AddParameter(cmd, "@StoryId", storyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
