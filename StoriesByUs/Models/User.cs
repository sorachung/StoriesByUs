using System.ComponentModel.DataAnnotations;

namespace StoriesByUs.Models
{
    public class User
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public string Bio { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }
    }
}
