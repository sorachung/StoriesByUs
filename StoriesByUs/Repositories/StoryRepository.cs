using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;

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
                        SELECT s.Id AS sId, s.Title, s.Summary, s.Notes, s.PublishedDateTime, s.LastUpdatedDateTime, s.Complete, s.UserId, s.RatingId,
                          u.DisplayName,
                          r.Level                       
                          FROM Story s
                               LEFT JOIN Rating r ON RatingId = r.Id
                               LEFT JOIN [User] u ON UserId = u.Id";


                    List<Story> stories = new List<Story>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var story = new Story()
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
                            }
                        };
                        stories.Add(story);
                    }
                    reader.Close();

                    return stories;
                }
            }
        }
    }
}
