using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using StoriesByUs.Models;
using StoriesByUs.Utils;
using System.Linq;

namespace StoriesByUs.Repositories
{
    public class RatingRepository : BaseRepository, IRatingRepository
    {
        public RatingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Rating> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Level]
                              FROM Rating;";


                    List<Rating> ratings = new List<Rating>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var rating = new Rating()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Level = DbUtils.GetString(reader, "Level")
                        };
                        ratings.Add(rating);
                    }
                    reader.Close();

                    return ratings;
                }
            }
        }
    }
}
