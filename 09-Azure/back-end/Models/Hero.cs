using System.ComponentModel.DataAnnotations;

namespace tour_of_heroes_api.Models
{
    public class Hero
    {
        /// <summary>
        /// Constructor antiguo: solo Name y AlterEgo
        /// </summary>
        public Hero(string Name, string AlterEgo)
        {
            this.Name = Name;
            this.AlterEgo = AlterEgo;
            this.ImageName = string.Empty; // valor por defecto
        }

        /// <summary>
        /// Constructor nuevo: Name, AlterEgo e ImageName
        /// </summary>
        public Hero(string Name, string AlterEgo, string ImageName)
        {
            this.Name = Name;
            this.AlterEgo = AlterEgo;
            this.ImageName = ImageName;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string AlterEgo { get; set; }

        public string? Description { get; set; }

        [Required]
        public string ImageName { get; set; } = string.Empty;
    }
}


