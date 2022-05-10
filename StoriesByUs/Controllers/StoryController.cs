using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StoryController : ControllerBase
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IUserRepository _userRepository;
        public StoryController(IStoryRepository storyRepository, IUserRepository userRepository)
        {
            _storyRepository = storyRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_storyRepository.GetAll());
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var story = _storyRepository.Get(id);
            if (story == null)
            {
                return NotFound();
            }
            return Ok(story);
        }

        [HttpGet("genre/{id}")]
        public IActionResult GetByGenre(int id)
        {
            return Ok(_storyRepository.GetByGenre(id));
        }

        [HttpGet("tag/{id}")]
        public IActionResult GetByTag(int id)
        {
            return Ok(_storyRepository.GetByTag(id));
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_storyRepository.GetByUser(id));
        }

        [HttpGet("recent")]
        public IActionResult GetRecent()
        {
            return Ok(_storyRepository.GetRecent());
        }

        [HttpPost]
        public IActionResult Post(Story story)
        {
            story.User = new User()
            {
                Id = GetCurrentUser().Id
            };

            story.PublishedDateTime = DateTime.Now;
            story.LastUpdatedDateTime = DateTime.Now;

            if (string.IsNullOrWhiteSpace(story.Notes))
            {
                story.Notes = null;
            }

            _storyRepository.Add(story);

            return CreatedAtAction("Get", new { id = story.Id }, story);
        }

        [HttpPost("{storyId}/tags")]
        public IActionResult PostStoryTag(int storyId, List<Tag> tags)
        {
            var tagIds = tags.Select(t => t.Id).ToList();

            _storyRepository.AddStoryTags(storyId, tagIds);

            return CreatedAtAction("Get", tags);
        }

        [HttpPost("{storyId}/genres")]
        public IActionResult PostStoryGenre(int storyId, List<Genre> genres)
        {
            var genreIds = genres.Select(g => g.Id).ToList();

            _storyRepository.AddStoryGenres(storyId, genreIds);

            return CreatedAtAction("Get", genres);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Story story)
        {
            if (id != story.Id)
            {
                return BadRequest();
            }
            if (string.IsNullOrWhiteSpace(story.Notes))
            {
                story.Notes = null;
            }

            _storyRepository.Edit(story);

            return NoContent();
        }

        [HttpPut("{storyId}/tags")]
        public IActionResult PutStoryTag(int storyId, List<Tag> tags)
        {
            var tagIds = tags.Select(t => t.Id).ToList();

            _storyRepository.EditStoryTags(storyId, tagIds);

            return NoContent();
        }

        [HttpPut("{storyId}/genres")]
        public IActionResult PutStoryGenre(int storyId, List<Genre> genres)
        {
            var genreIds = genres.Select(g => g.Id).ToList();

            _storyRepository.EditStoryGenres(storyId, genreIds);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var story = _storyRepository.Get(id);
            var currentUser = GetCurrentUser();
            if (story.User.Id == currentUser.Id || currentUser.UserTypeId == 1)
            {
                _storyRepository.DeleteStory(id);
                return NoContent();
            }
            return Unauthorized();
        }
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
