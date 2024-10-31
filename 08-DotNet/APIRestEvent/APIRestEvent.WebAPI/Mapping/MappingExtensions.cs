using APIRestEvent.WebAPI.DTOs;
using APIRestEvent.WebAPI.Models;

public static class MappingExtensions
{
    // Mappers de entidad a DTO
    public static EventDTO ToDto(this Event eventEntity)
    {
        if (eventEntity == null) return null;

        return new EventDTO(
            eventEntity.Id,
            eventEntity.Name,
            eventEntity.StartDate,
            eventEntity.EndDate,
            eventEntity.Description,
            eventEntity.Participants?.Select(p => p.ToBaseDto()).ToList() ?? new List<BaseParticipantDTO>()
        );
    }

    public static ParticipantDTO ToDto(this Participant participantEntity)
    {
        if (participantEntity == null) return null;

        return new ParticipantDTO(
            participantEntity.Id,
            participantEntity.Name,
            participantEntity.LastName,
            participantEntity.Email,
            participantEntity.Events?.Select(e => e.ToBaseDto()).ToList() ?? new List<BaseEventDTO>()
        );
    }

    public static BaseEventDTO ToBaseDto(this Event eventEntity)
    {
        if (eventEntity == null) return null;

        return new BaseEventDTO(
            eventEntity.Id,
            eventEntity.Name,
            eventEntity.StartDate,
            eventEntity.EndDate,
            eventEntity.Description
        );
    }

    public static BaseParticipantDTO ToBaseDto(this Participant participantEntity)
    {
        if (participantEntity == null) return null;

        return new BaseParticipantDTO(
            participantEntity.Id,
            participantEntity.Name,
            participantEntity.LastName,
            participantEntity.Email
        );
    }
}
