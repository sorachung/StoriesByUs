using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;
using StoriesByUs.Utils;
using System;
using System.Security.Claims;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChapterController : ControllerBase
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly IStoryRepository _storyRepository;
        private readonly IUserRepository _userRepository;
        public ChapterController(IChapterRepository chapterRepository, IStoryRepository storyRepository, IUserRepository userRepository)
        {
            _chapterRepository = chapterRepository;
            _storyRepository = storyRepository;
            _userRepository = userRepository;
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

        [HttpGet("all/story/{storyId}")]
        public IActionResult GetChaptersFromStory(int storyId)
        {
            var chapters = _chapterRepository.GetFromStory(storyId);
            if (chapters.Count == 0)
            {
                return NotFound();
            }
            return Ok(chapters);
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

            return CreatedAtAction("GetOneChapter", new { storyId = chapter.Id, placeInOrder = chapter.PlaceInOrder }, chapter);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Chapter chapter)
        {
            if (id != chapter.Id)
            {
                return BadRequest();
            }
            if (string.IsNullOrWhiteSpace(chapter.Notes))
            {
                chapter.Notes = null;
            }
            chapter.WordCount = WordCounter.Count(chapter.Body);

            _chapterRepository.Edit(chapter);
            _storyRepository.EditLastUpdatedDateTime(chapter.Story.Id, DateTime.Now);
            return NoContent();
        }

        [HttpDelete("{id}/story/{storyId}")]
        public IActionResult Delete(int id, int storyId)
        {
            var story = _storyRepository.Get(storyId);
            if (story.User.Id != GetCurrentUser().Id)
            {
                return Unauthorized();
            }

            _chapterRepository.Delete(id, storyId);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
