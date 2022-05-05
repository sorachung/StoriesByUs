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
