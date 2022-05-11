using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class BookmarkRepository : BaseRepository, IBookmarkRepository
    {
        public BookmarkRepository(IConfiguration configuration) : base(configuration) { }

        public List<Bookmark> GetByUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT b.Id AS bId, b.StoryId AS bStoryId, b.UserId AS bUserId, b.Notes AS bNotes,
                                   s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                                   u.DisplayName,
                                   r.[Level],
                                   c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                                   sg.GenreId, g.[Name] AS GenreName,
                                   st.TagId, t.[Name] AS TagName,
                                   bm.Id AS bmId
                              FROM Bookmark b
                                   LEFT JOIN Story s ON s.Id = b.StoryId
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON s.UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark bm ON bm.StoryId = s.Id
                             WHERE b.UserId = @userId AND IsDeactivated = 0";


                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var bookmarks = new List<Bookmark>();

                    while (reader.Read())
                    {
                        var bookmarkId = DbUtils.GetInt(reader, "bId");
                        var existingBookmark = bookmarks.FirstOrDefault(b => b.Id == bookmarkId);

                        if (existingBookmark == null)
                        {
                            existingBookmark = new Bookmark()
                            {
                                Id = bookmarkId,
                                StoryId = DbUtils.GetInt(reader, "bStoryId"),
                                UserId = DbUtils.GetInt(reader, "bUserId"),
                                Notes = DbUtils.GetString(reader, "bNotes"),
                                Story = null
                            };
                        }

                        if (existingBookmark.Story == null)
                        {
                            existingBookmark.Story = new Story()
                            {
                                Id = DbUtils.GetInt(reader, "bStoryId"),
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
                            bookmarks.Add(existingBookmark);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingBookmark.Story.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingBookmark.Story.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingBookmark.Story.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingBookmark.Story.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingBookmark.Story.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingBookmark.Story.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "bmId"))
                        {
                            var storyBookmarkId = DbUtils.GetInt(reader, "bmId");
                            if (existingBookmark.Story.Bookmarks.FirstOrDefault(b => b.Id == storyBookmarkId) == null)
                            {
                                existingBookmark.Story.Bookmarks.Add(new Bookmark()
                                {
                                    Id = storyBookmarkId
                                });
                            }
                        }
                    }

                    reader.Close();

                    return bookmarks;
                }
            }
        }

        public List<Bookmark> GetRecentByUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT b.Id AS bId, b.StoryId AS bStoryId, b.UserId AS bUserId, b.Notes AS bNotes,
                                   s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                                   u.DisplayName,
                                   r.[Level],
                                   c.Id AS ChapterId, c.PlaceInOrder, c.WordCount,
                                   sg.GenreId, g.[Name] AS GenreName,
                                   st.TagId, t.[Name] AS TagName,
                                   bm.Id AS bmId
                              FROM Bookmark b
                                   LEFT JOIN Story s ON s.Id = b.StoryId
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON s.UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                   LEFT JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                   LEFT JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark bm ON bm.StoryId = s.Id
                             WHERE b.Id IN (SELECT TOP 3 b.Id FROM Bookmark b WHERE b.UserId = @userId ORDER BY b.Id DESC) AND IsDeactivated = 0
                             ORDER BY b.Id DESC";


                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var bookmarks = new List<Bookmark>();

                    while (reader.Read())
                    {
                        var bookmarkId = DbUtils.GetInt(reader, "bId");
                        var existingBookmark = bookmarks.FirstOrDefault(b => b.Id == bookmarkId);

                        if (existingBookmark == null)
                        {
                            existingBookmark = new Bookmark()
                            {
                                Id = bookmarkId,
                                StoryId = DbUtils.GetInt(reader, "bStoryId"),
                                UserId = DbUtils.GetInt(reader, "bUserId"),
                                Notes = DbUtils.GetString(reader, "bNotes"),
                                Story = null
                            };
                        }

                        if (existingBookmark.Story == null)
                        {
                            existingBookmark.Story = new Story()
                            {
                                Id = DbUtils.GetInt(reader, "bStoryId"),
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
                            bookmarks.Add(existingBookmark);
                        }
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (existingBookmark.Story.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                existingBookmark.Story.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (existingBookmark.Story.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                existingBookmark.Story.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            if (existingBookmark.Story.Chapters.FirstOrDefault(c => c.Id == chapterId) == null)
                            {
                                existingBookmark.Story.Chapters.Add(new Chapter()
                                {
                                    Id = chapterId,
                                    PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                    WordCount = DbUtils.GetInt(reader, "WordCount")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "bmId"))
                        {
                            var storyBookmarkId = DbUtils.GetInt(reader, "bmId");
                            if (existingBookmark.Story.Bookmarks.FirstOrDefault(b => b.Id == storyBookmarkId) == null)
                            {
                                existingBookmark.Story.Bookmarks.Add(new Bookmark()
                                {
                                    Id = storyBookmarkId
                                });
                            }
                        }
                    }

                    reader.Close();

                    return bookmarks;
                }
            }
        }

        public Bookmark GetByStoryAndUser(int storyId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, StoryId, UserId, Notes
                              FROM Bookmark
                             WHERE StoryId = @storyId AND UserId = @userId";

                    DbUtils.AddParameter(cmd, "@storyId", storyId);
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    Bookmark bookmark = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        bookmark = new Bookmark()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            StoryId = DbUtils.GetInt(reader, "StoryId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                        };
                    }
                    reader.Close();

                    return bookmark;
                }
            }
        }

        public void Add(Bookmark bookmark)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bookmark (StoryId, UserId, Notes)
                                        OUTPUT INSERTED.ID
                                        VALUES (@storyId, @userId, @notes)";
                    DbUtils.AddParameter(cmd, "@storyId", bookmark.StoryId);
                    DbUtils.AddParameter(cmd, "@userId", bookmark.UserId);
                    DbUtils.AddParameter(cmd, "@notes", bookmark.Notes);

                    bookmark.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Bookmark bookmark)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Bookmark
                           SET Notes = @Notes
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Notes", bookmark.Notes);
                    DbUtils.AddParameter(cmd, "@Id", bookmark.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Bookmark WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
