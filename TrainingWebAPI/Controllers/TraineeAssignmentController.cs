using Configuration;
using DataAccess.AdoNet;
using Domain;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TraineeAssignmentController : ControllerBase
    {
        public TraineeAssignmentController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            traineeAssignmentsRepository = new TraineeAssignmentsRepository(this.appSettings);
        }

        TraineeAssignmentsRepository traineeAssignmentsRepository;
        private readonly AppSettings appSettings;

        [HttpGet]
        public List<TraineeAssignmentViewModel> GetTraineeAssignments()
        {
            var assignment = traineeAssignmentsRepository.GetTraineeAssignments();
            return assignment;
        }
        [HttpPost]
        public object AddTraineeAssignment([FromBody] TraineeAssignment traineeAssignment)
        {
            traineeAssignmentsRepository.AddAssignment(traineeAssignment);
            return new
            {
                response = "success"
            };
        }



        [HttpPost]
        public object UpdateTraineeAssignment([FromBody] TraineeAssignment traineeAssignment)
        {
            traineeAssignmentsRepository.UpdateAssignment(traineeAssignment);
            return new
            {
                response = "success"
            };
        }
    }
}
