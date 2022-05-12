using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoriesByUs.Models;
using StoriesByUs.Repositories;
using System;
using System.Security.Claims;

namespace StoriesByUs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("byId/{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _userRepository.GetbyId(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            return Ok(GetCurrentUser());
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

        [HttpPut("bio/")]
        public IActionResult PutBio(User user)
        {
            if (GetCurrentUser().Id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.EditBio(user);
            return NoContent();
        }

        [HttpGet("type")]
        public IActionResult GetCurrentUserType()
        {
            return Ok(new { type = GetCurrentUser().UserTypeId });
        }

        [HttpPut("deactivate/{id}")]
        public IActionResult Deactivate(int id, User user)
        {
            try
            {
                if (id != user.Id)
                {
                    return BadRequest();
                }
                var currentUser = GetCurrentUser();
                if (currentUser.UserTypeId == 1)
                {
                    _userRepository.Deactivate(id);
                    return NoContent();
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut("reactivate/{id}")]
        public IActionResult Reactivate(int id, User profile)
        {
            if (id != profile.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUser();
            if (currentUser.UserTypeId == 1)
            {
                _userRepository.Reactivate(id);
                return NoContent();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("deactivated")]
        public IActionResult GetDeactivatedUsers()
        {
            return Ok(_userRepository.GetDeactivatedUsers());
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
