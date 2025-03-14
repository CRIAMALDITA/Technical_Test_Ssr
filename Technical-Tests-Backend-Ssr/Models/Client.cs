using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Technical_Tests_Backend_Ssr.Models
{
    [Table("client")]
    public class Client
    {
        [Key] public int IdClient { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
    }
}