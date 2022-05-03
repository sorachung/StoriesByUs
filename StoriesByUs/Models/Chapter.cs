namespace StoriesByUs.Models
{
    public class Chapter
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int PlaceInOrder { get; set; }
        public string Notes { get; set; }
        public Story Story { get; set; }
        public int WordCount { get; set; }
    }
}
