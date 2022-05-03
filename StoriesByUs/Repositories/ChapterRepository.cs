using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class ChapterRepository : BaseRepository, IChapterRepository
    {
        public ChapterRepository(IConfiguration configuration) : base(configuration) { }

        public Chapter GetWithStory(int chapterId, int storyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT c.Id AS ChapterId, c.Title AS ChapterTitle, c.Body AS ChapterBody, c.PlaceInOrder, c.Notes AS ChapterNotes,
                          s.Id AS [sId], s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId, 
                          u.DisplayName,
                          r.[Level],
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Chapter c
                                   LEFT JOIN Story s ON c.StoryId = s.Id
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                        JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                        JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id
                             WHERE s.Id = @storyId AND c.Id = @chapterId";

                    DbUtils.AddParameter(cmd, "@storyId", storyId);
                    DbUtils.AddParameter(cmd, "@chapterId", chapterId);

                    Chapter chapter = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (chapter == null)
                        {
                            chapter = new Chapter()
                            {
                                Id = DbUtils.GetInt(reader, "ChapterId"),
                                Title = DbUtils.GetString(reader, "ChapterTitle"),
                                Body = DbUtils.GetString(reader, "ChapterBody"),
                                PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                                Notes = DbUtils.GetString(reader, "ChapterNotes"),
                                Story = null
                            };
                        }

                        if (chapter.Story == null)
                        {
                            chapter.Story = new Story()
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
                                Bookmarks = new List<Bookmark>(),
                            };
                        }


                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var tagId = DbUtils.GetInt(reader, "TagId");
                            if (chapter.Story.Tags.FirstOrDefault(t => t.Id == tagId) == null)
                            {
                                chapter.Story.Tags.Add(new Tag()
                                {
                                    Id = tagId,
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "GenreId"))
                        {
                            var genreId = DbUtils.GetInt(reader, "GenreId");
                            if (chapter.Story.Genres.FirstOrDefault(g => g.Id == genreId) == null)
                            {
                                chapter.Story.Genres.Add(new Genre()
                                {
                                    Id = genreId,
                                    Name = DbUtils.GetString(reader, "GenreName")
                                });
                            }
                        }


                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            if (chapter.Story.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId) == null)
                            {
                                chapter.Story.Bookmarks.Add(new Bookmark()
                                {
                                    Id = bookmarkId
                                });
                            }
                        }
                    }
                    reader.Close();

                    return chapter;
                }
            }
        }
        public List<Chapter> GetAllFromStory(int storyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, Title, PlaceInOrder, WordCount
                              FROM Chapter c
                             WHERE StoryId = @storyId
                             ORDER BY PlaceInOrder";

                    DbUtils.AddParameter(cmd, "@storyId", storyId);

                    List<Chapter> chapters = new List<Chapter>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                       var chapter = new Chapter()
                       {
                           Id = DbUtils.GetInt(reader, "Id"),
                           Title = DbUtils.GetString(reader, "Title"),
                           PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                           WordCount = DbUtils.GetInt(reader, "WordCount")
                       };
                        chapters.Add(chapter);
                    }
                    reader.Close();

                    return chapters;
                }
            }
        }
    }
}
