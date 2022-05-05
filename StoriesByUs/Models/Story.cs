using System;
using System.Collections.Generic;
using System.Linq;

namespace StoriesByUs.Models
{
    public class Story
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Notes { get; set; }
        public DateTime PublishedDateTime { get; set; }
        public DateTime LastUpdatedDateTime { get; set; }
        public bool Complete { get; set; }
        public Rating Rating { get; set; }
        public User User { get; set; }
        public List<Chapter> Chapters { get; set; }
        public List<Bookmark> Bookmarks { get; set; }
        public List<Genre> Genres { get; set; }
        public List<Tag> Tags { get; set; }
        public int WordCount
        {
            get
            {
                try 
                {
                    return Chapters.Sum(c => c.WordCount);
                }
                catch (Exception ex)
                {
                    return 0;
                }
            }
        }
    }
}
