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

    //Mappers de DTO a Entidad
    public static Event ToEntity(this EventDTO eventDto)
    {
        if (eventDto == null) return null;

        return new Event
        {
            Id = eventDto.Id,
            Name = eventDto.Name,
            StartDate = eventDto.StartDate,
            EndDate = eventDto.EndDate,
            Description = eventDto.Description,
            Participants = eventDto.Participants?.Select(p => p.ToEntity()).ToList() ?? new List<Participant>()
        };
    }

    public static Participant ToEntity(this ParticipantDTO participantDto)
    {
        if (participantDto == null) return null;

        return new Participant
        {
            Id = participantDto.Id,
            Name = participantDto.Name,
            LastName = participantDto.LastName,
            Email = participantDto.Email,
            Events = participantDto.Events?.Select(e => e.ToEntity()).ToList() ?? new List<Event>()
        };
    }

    public static Event ToEntity(this BaseEventDTO baseEventDto)
    {
        if (baseEventDto == null) return null;

        return new Event
        {
            Id = baseEventDto.Id,
            Name = baseEventDto.Name,
            StartDate = baseEventDto.StartDate,
            EndDate = baseEventDto.EndDate,
            Description = baseEventDto.Description,
            Participants = new List<Participant>()
        };
    }

    public static Participant ToEntity(this BaseParticipantDTO baseParticipantDto)
    {
        if (baseParticipantDto == null) return null;

        return new Participant
        {
            Id = baseParticipantDto.Id,
            Name = baseParticipantDto.Name,
            LastName = baseParticipantDto.LastName,
            Email = baseParticipantDto.Email,
            Events = new List<Event>()
        };
    }
}
