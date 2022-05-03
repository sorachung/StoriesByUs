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
    public class StoryController : ControllerBase
    {
        private readonly IStoryRepository _storyRepository;
        public StoryController(IStoryRepository storyRepository)
        {
            _storyRepository = storyRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_storyRepository.GetAll());
        }

        [HttpGet("genre/{id}")]
        public IActionResult GetByGenre(int id)
        {
            return Ok(_storyRepository.GetByGenre(id));
        }
    }
}
