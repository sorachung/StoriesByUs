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

        [HttpGet("{chapterId}/story/{storyId}")]
        public IActionResult GetWithStory(int chapterId, int storyId)
        {
            var chapter = _chapterRepository.GetWithStory(chapterId, storyId);
            if (chapter == null)
            {
                return NotFound();
            }
            return Ok(chapter);
        }

        [HttpGet("story/{storyId}")]
        public IActionResult GetAllFromStory(int storyId)
        {
            return Ok(_chapterRepository.GetAllFromStory(storyId));
        }
    }
}
