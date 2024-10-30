namespace APIRestEvent.WebAPI.DTOs
    {
        public class EventDTO : BaseEventDTO
        {

            public List<BaseParticipantDTO> Participants { get; set; }

            public EventDTO(int id, string name, DateTime startDate, DateTime? endDate, string description, List<BaseParticipantDTO> participants)
                : base(id, name, startDate, endDate, description)
            {
                Participants = participants ?? new List<BaseParticipantDTO>();
            }
        }
 }
