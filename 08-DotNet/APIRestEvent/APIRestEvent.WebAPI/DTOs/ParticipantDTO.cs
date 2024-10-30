namespace APIRestEvent.WebAPI.DTOs
{
    public class ParticipantDTO:BaseParticipantDTO
    {
        public List<BaseEventDTO> Events { get; set; }

        public ParticipantDTO(int id, string name, string lastName, string email, List<BaseEventDTO> events): base(id, name, lastName, email)
        {
            Events = events ?? new List<BaseEventDTO>();
        }
    }
}

