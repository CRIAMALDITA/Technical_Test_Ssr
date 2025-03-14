using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Technical_Tests_Backend_Ssr.Models
{
    [Table("user")]
    public class User
    {
        [Key] public int IdUser { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserPasswordHash { get; set; } = string.Empty;
        public int UserPermission { get; set; } // 0 = Admin, 1 = Editor, 2 = Viewer
    }
}