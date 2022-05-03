using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class GenreRepository : BaseRepository, IGenreRepository
    {
        public GenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Genre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS gId, g.[Name]
                            FROM Genre g";


                    List<Genre> genres = new List<Genre>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var genre = new Genre()
                        {
                            Id = DbUtils.GetInt(reader, "gId"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                        genres.Add(genre);
                    }
                    reader.Close();

                    return genres;
                }
            }
        }

        public Genre Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS gId, g.[Name]
                            FROM Genre g
                            WHERE g.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Genre genre = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        genre = new Genre()
                        {
                            Id = DbUtils.GetInt(reader, "gId"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();

                    return genre;
                }
            }
        }

        public List<Genre> GetAllWithStoryCountOverZero()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id AS gId, g.[Name], COUNT(s.Title) as StoryCount
	                        FROM Genre g
	                            LEFT JOIN StoryGenre sg ON sg.GenreId = g.Id
	                            LEFT JOIN Story s ON s.Id = sg.StoryId
	                        GROUP BY g.Id, g.[Name]
	                        HAVING Count(s.Title) > 0
	                        ORDER BY StoryCount DESC;";


                    List<Genre> genres = new List<Genre>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var genre = new Genre()
                        {
                            Id = DbUtils.GetInt(reader, "gId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            StoryCount = DbUtils.GetInt(reader, "StoryCount")
                        };
                        genres.Add(genre);
                    }
                    reader.Close();

                    return genres;
                }
            }
        }
    }
}
