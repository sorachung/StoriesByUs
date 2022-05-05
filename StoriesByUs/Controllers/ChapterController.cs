using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;
using StoriesByUs.Utils;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChapterController : ControllerBase
    {
        private readonly IChapterRepository _chapterRepository;
        public ChapterController(IChapterRepository chapterRepository)
        {
            _chapterRepository = chapterRepository;
        }        

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("{placeInOrder}/story/{storyId}")]
        public IActionResult GetOneChapter(int placeInOrder, int storyId)
        {
            var chapter = _chapterRepository.GetOneFromStory(storyId, placeInOrder);
            if (chapter == null)
            {
                return NotFound();
            }
            return Ok(chapter);
        }

        [HttpPost]
        public IActionResult Post(Chapter chapter)
        {

            if (string.IsNullOrWhiteSpace(chapter.Notes))
            {
                chapter.Notes = null;
            }
            chapter.WordCount = WordCounter.Count(chapter.Body);

            _chapterRepository.Add(chapter);

            return CreatedAtAction("Get", new { id = chapter.Id }, chapter);
        }
    }
}
