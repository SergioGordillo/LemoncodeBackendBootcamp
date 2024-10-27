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
           (eventEntity.Participants ?? new List<Participant>()).Select(p => p.ToDto()).ToList()
        );
    }

    public static ParticipantDTO ToDto(this Participant participantEntity)
    {
        return new ParticipantDTO(
           participantEntity.Id,
           participantEntity.Name,
           participantEntity.LastName,
           participantEntity.Email,
           participantEntity.Events.Select(e => e.ToDto()).ToList()
        );
    }

    // Mappers de DTO a entidad
    public static Event ToEntity(this EventDTO eventDTO)
    {
        return new Event
        {
            Id = eventDTO.Id,
            Name = eventDTO.Name,
            StartDate = eventDTO.StartDate,
            EndDate = eventDTO.EndDate,
            Description = eventDTO.Description,
            Participants = eventDTO.Participants.Select(p => p.ToEntity()).ToList()
        };
    }

    public static Participant ToEntity(this ParticipantDTO participantDTO)
    {
        return new Participant
        {
            Id = participantDTO.Id,
            Name = participantDTO.Name,
            LastName = participantDTO.LastName,
            Email = participantDTO.Email,
            Events = participantDTO.Events.Select(e => e.ToEntity()).ToList()
        };
    }
}
