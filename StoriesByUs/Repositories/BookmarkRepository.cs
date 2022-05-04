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
    }
}
