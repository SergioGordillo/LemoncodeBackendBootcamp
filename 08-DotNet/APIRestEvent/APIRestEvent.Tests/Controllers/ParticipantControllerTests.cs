using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using APIRestEvent.WebAPI.Controllers;
using APIRestEvent.WebAPI.Models;
using APIRestEvent.WebAPI.Data;
using APIRestEvent.WebAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace APIRestEvent.Tests
{
    [TestFixture]
    internal class ParticipantControllerTests
    {
        private ApplicationDbContext _context;
        private ParticipantController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                          .UseInMemoryDatabase(databaseName: "TestDatabase")
                          .Options;

            _context = new ApplicationDbContext(options);

            _context.Participants.AddRange(
                new Participant { Id = 1, Name = "John", LastName = "Doe", Email = "john.doe@example.com", Events = new List<Event>() },
                new Participant { Id = 2, Name = "Jane", LastName = "Doe", Email = "jane.doe@example.com", Events = new List<Event>() }
            );
            _context.SaveChanges();

            _controller = new ParticipantController(_context);
        }

        [Test]
        public async Task GetParticipants_ReturnsOkResult_WithListOfParticipantsDTOs()
        {
            //Arrange
            var result = await _controller.GetParticipants();

            //Act
            var okResult = result.Result as OkObjectResult;
            //Assert
            Assert.IsNotNull(okResult, "Expected OkObjectResult, but got null");
            //Act
            var participantsDTOs = okResult.Value as List<ParticipantDTO>;
            //Assert
            Assert.IsNotNull(participantsDTOs, "Expected a list of participants, but got null");
            Assert.AreEqual(2, participantsDTOs.Count, "Expected 2 participants in the list");
        }

    [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}
