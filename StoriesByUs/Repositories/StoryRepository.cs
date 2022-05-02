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
                          c.Id AS ChapterId,
                          sg.GenreId, g.[Name] AS GenreName,
                          st.TagId, t.[Name] AS TagName,
                          b.Id AS BookmarkId
                              FROM Story s
                                   LEFT JOIN Rating r ON RatingId = r.Id
                                   LEFT JOIN [User] u ON UserId = u.Id
                                   LEFT JOIN Chapter c ON c.StoryId = s.Id
                                   LEFT JOIN StoryGenre sg ON sg.StoryId = s.Id
                                        JOIN Genre g ON g.Id = sg.GenreId
                                   LEFT JOIN StoryTag st ON st.StoryId = s.Id       
                                        JOIN Tag t ON t.Id = st.TagId
                                   LEFT JOIN Bookmark b ON b.StoryId = s.Id;";


                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var storyId = DbUtils.GetInt(reader, "sId");
                        var existingStory = stories.FirstOrDefault(s => s.Id == storyId);
                        if(existingStory == null)
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
                                Chapters = new List<Chapter>(),
                                Bookmarks = new List<Bookmark>(),

                            };
                            stories.Add(existingStory);
                        }
                        

                        if (DbUtils.IsNotDbNull(reader, "ChapterId"))
                        {
                            var chapterId = DbUtils.GetInt(reader, "ChapterId");
                            var existingChapter = existingStory.Chapters.FirstOrDefault(c => c.Id == chapterId);
                            if (existingChapter == null)
                            {
                                existingChapter = new Chapter()
                                {
                                    Id = chapterId
                                };
                                existingStory.Chapters.Add(existingChapter);
                            }
                           
                        }
                        if (DbUtils.IsNotDbNull(reader, "BookmarkId"))
                        {
                            var bookmarkId = DbUtils.GetInt(reader, "BookmarkId");
                            var existingBookmark = existingStory.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId);
                            if (existingBookmark == null)
                            {
                                existingBookmark = new Bookmark()
                                {
                                    Id = bookmarkId
                                };
                                existingStory.Bookmarks.Add(existingBookmark);
                            }
                        }
                    }
                    reader.Close();

                    return stories;
                }
            }
        }
    }
}
