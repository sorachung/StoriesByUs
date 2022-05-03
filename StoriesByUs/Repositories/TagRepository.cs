using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                            FROM Tag";


                    List<Tag> tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                        tags.Add(tag);
                    }
                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                            FROM Tag
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Tag tag = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();

                    return tag;
                }
            }
        }

        public List<Tag> GetAllWithStoryCountOverZero()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS tId, t.[Name], COUNT(s.Title) as StoryCount
	                        FROM Tag t
	                            LEFT JOIN StoryTag st ON st.TagId = t.Id
	                            LEFT JOIN Story s ON s.Id = st.StoryId
	                        GROUP BY t.Id, t.[Name]
	                        HAVING Count(s.Title) > 0
	                        ORDER BY StoryCount DESC;";


                    List<Tag> tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "tId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            StoryCount = DbUtils.GetInt(reader, "StoryCount")
                        };
                        tags.Add(tag);
                    }
                    reader.Close();

                    return tags;
                }
            }
        }
    }
}
