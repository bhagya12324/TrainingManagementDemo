using Configuration;
using DataAccess.AdoNet;
using Domain;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TraineeEvaluationsController : ControllerBase
    {
        public TraineeEvaluationsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            traineeEvaluationsRepository = new TraineeEvaluationsRepository(this.appSettings);
        }

        TraineeEvaluationsRepository traineeEvaluationsRepository;
        private readonly AppSettings appSettings;
        //TraineeEvaluationsRepository traineeEvaluationsRepository = new TraineeEvaluationsRepository();
        [HttpGet]
        public List<TraineeEvaluationsViewModel> GetTraineeEvaluations()
        {
            var traineeEvaluations = traineeEvaluationsRepository.GetTraineeEvaluations();
            return traineeEvaluations;
        }
        [HttpPost]
        public object InsertTraineeEvaluation([FromBody] TraineeEvaluation traineeEvaluation)
        {

            traineeEvaluationsRepository.InsertTraineeEvaluation(traineeEvaluation);

            return new
            {
                message = "success"
            };
        }
        [HttpPost]
        public object UpdateTraineeEvaluation([FromBody] TraineeEvaluation traineeEvaluation)
        {

            traineeEvaluationsRepository.UpdateTraineeEvaluation(traineeEvaluation);

            return new
            {
                message = "success"
            };
        }

        //[HttpPost]
        //public List<TraineeEvaluationViewModel> getTraineeEval(int id)
        //{
        //    var traineeevaldetails = traineeEvaluationsRepository.getTraineeEvalById(id);
        //    return traineeevaldetails;
        //}
    }
}
