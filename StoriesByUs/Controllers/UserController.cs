using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            user.UserTypeId = UserType.READERAUTHOR_ID;
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }
    }
}
