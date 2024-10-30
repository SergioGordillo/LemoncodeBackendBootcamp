namespace APIRestEvent.WebAPI.DTOs
{
    public class BaseParticipantDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public BaseParticipantDTO(int id, string name, string lastName, string email)
        {
            Id = id;
            Name = !string.IsNullOrWhiteSpace(name) ? name : throw new ArgumentException("Name cannot be null or empty.", nameof(name));
            LastName = !string.IsNullOrWhiteSpace(lastName) ? lastName : throw new ArgumentException("LastName cannot be null or empty.", nameof(lastName));
            Email = !string.IsNullOrWhiteSpace(email) ? email : throw new ArgumentException("Email cannot be null or empty.", nameof(email));
        }
    }
}
