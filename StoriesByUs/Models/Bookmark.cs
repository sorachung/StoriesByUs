namespace StoriesByUs.Models
{
    public class Bookmark
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public int UserId { get; set; }
        public string Notes { get; set; }

    }
}
