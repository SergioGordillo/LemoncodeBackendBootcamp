﻿namespace APIRestEvent.WebAPI.DTOs
{
    public class BaseEventDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }

        public BaseEventDTO(int id, string name, DateTime startDate, DateTime? endDate, string description)
        {
            Id = id;
            Name = !string.IsNullOrWhiteSpace(name) ? name : throw new ArgumentException("Name cannot be null or empty.", nameof(name));
            StartDate = startDate;
            EndDate = endDate;
            Description = !string.IsNullOrWhiteSpace(description) ? description : throw new ArgumentException("Description cannot be null or empty.", nameof(description));
        }
    }
}
