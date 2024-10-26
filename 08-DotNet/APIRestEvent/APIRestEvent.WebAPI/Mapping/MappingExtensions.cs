using APIRestEvent.WebAPI.DTOs;
using APIRestEvent.WebAPI.Models;

public static class MappingExtensions
{
    public static EventDTO ToDto(this Event eventEntity)
    {
        return new EventDTO(
           eventEntity.Id,
           eventEntity.Name,
           eventEntity.StartDate,
           eventEntity.EndDate,
           eventEntity.Description,
           eventEntity.Participants.Select(p => p.ToDto()).ToList()
        );
    }

    public static ParticipantDTO ToDto(this Participant participantEntity)
    {
        return new ParticipantDTO(
           participantEntity.Id,
           participantEntity.Name,
           participantEntity.LastName,
           participantEntity.Email,
           participantEntity.Events.Select(p => p.ToDto()).ToList()
        );
    }
}
