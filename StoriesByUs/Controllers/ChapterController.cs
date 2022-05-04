using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;

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
    }
}
