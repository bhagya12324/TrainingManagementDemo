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
    public class EvaluationsController : ControllerBase
    {
        public EvaluationsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
           evaluationsRepository = new EvaluationsRepository(this.appSettings);
        }

        EvaluationsRepository evaluationsRepository;
        private readonly AppSettings appSettings;
        //EvaluationsRepository evaluationsRepository=new EvaluationsRepository();
        [HttpGet]
        public List<EvaluationViewModel> GetEvaluations()
        {
            var evaluations = evaluationsRepository.GetEvaluations();
            return evaluations;
        }
        [HttpPost]
        public object InsertEvaluation([FromBody] Evaluation evaluation)
        {

            evaluationsRepository.InsertEvaluation(evaluation);

            return new
            {
                message = "success"
            };
        }
        [HttpPost]
        public object UpdateEvaluation([FromBody] Evaluation evaluation)
        {

            evaluationsRepository.UpdateEvaluation(evaluation);

            return new
            {
                message = "success"
            };
        }
    }
}
