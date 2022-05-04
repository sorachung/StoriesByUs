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

        public Chapter GetOneFromStory(int storyId, int placeInOrder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, Title, PlaceInOrder, WordCount, Body, Notes
                              FROM Chapter c
                             WHERE StoryId = @storyId AND PlaceInOrder = @placeInOrder";

                    DbUtils.AddParameter(cmd, "@storyId", storyId);
                    DbUtils.AddParameter(cmd, "@placeInOrder", placeInOrder);

                    Chapter chapter = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        chapter = new Chapter()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PlaceInOrder = DbUtils.GetInt(reader, "PlaceInOrder"),
                            WordCount = DbUtils.GetInt(reader, "WordCount"),
                            Body = DbUtils.GetString(reader, "Body"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                        };
                    }
                    reader.Close();

                    return chapter;
                }
            }
        }
    }
}
