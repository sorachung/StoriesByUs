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
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;
        public GenreController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_genreRepository.GetAll());
        }

        [HttpGet("withStoryCount")]
        public IActionResult GetWithStoryCount()
        {
            return Ok(_genreRepository.GetAllWithStoryCountOverZero());
        }
    }
}