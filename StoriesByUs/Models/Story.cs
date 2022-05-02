using System;

namespace StoriesByUs.Models
{
    public class Story
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Notes{ get; set; }
        public DateTime PublishedDateTime { get; set; }
        public DateTime LastUpdatedDateTime { get; set; }
        public bool Complete { get; set; }
        public Rating Rating { get; set; }
        public User User { get; set; }
    }
}
