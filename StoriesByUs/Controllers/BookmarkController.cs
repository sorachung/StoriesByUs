using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;
using System.Security.Claims;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarkController : ControllerBase
    {
        private readonly IBookmarkRepository _bookmarkRepository;
        private readonly IUserRepository _userRepository;
        public BookmarkController(IBookmarkRepository bookmarkRepository, IUserRepository userRepository)
        {
            _bookmarkRepository = bookmarkRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("story/{storyId}")]
        public IActionResult GetCurrentUsersBookmarkForStory(int storyId)
        {
            var currentUserId = GetCurrentUser().Id;
            var bookmark = _bookmarkRepository.GetByStoryAndUser(storyId, currentUserId);
            if (bookmark == null)
            {
                return NotFound();
            }
            return Ok(bookmark);
        }

        [HttpPost]
        public IActionResult Post(Bookmark bookmark)
        {
            bookmark.UserId = GetCurrentUser().Id;
            _bookmarkRepository.Add(bookmark);
            return CreatedAtAction(
                "Get",
                new { id = bookmark.Id },
                bookmark);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Bookmark bookmark)
        {
            if (id != bookmark.Id)
            {
                return BadRequest();
            }
            _bookmarkRepository.Edit(bookmark);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookmarkRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}