using Configuration;
using DataAccess.AdoNet;
using Domain;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace TrainingWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TraineesController : ControllerBase
    {

        public TraineesController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            traineesRepository = new TraineesRepository(this.appSettings);
        }
        TraineesRepository traineesRepository;

        private readonly AppSettings appSettings;

        [HttpGet]
        [AllowAnonymous]
        public List<TraineeViewModel> GetTrainees()
        {

            var trainees = traineesRepository.GetTrainees();
            return trainees;
        }
        [HttpPost]

        public Object InsertTrainee([FromBody] Trainee trainee)
        {
            List<string> requiredFields = new List<string>();
            // validations
            PropertyInfo[] properties = trainee.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType == typeof(string))
                {
                    string propertyName = property.Name;
                    string value = (string)property.GetValue(trainee);
                    if (string.IsNullOrWhiteSpace(value))
                    {
                        requiredFields.Add(propertyName);
                    }
                }
            }

            if (requiredFields.Count < 1)
            {
                traineesRepository.InsertTrainee(trainee);

                return new
                {
                    response = "Success",
                    requiredFields = requiredFields
                };
            }

            return new
            {
                response = "Failed",
                requiredFields = requiredFields
            };

        }
        [HttpPost]

        public Object EditTrainee([FromBody] Trainee trainee)
        {

            List<string> requiredFields = new List<string>();
            // validations
            PropertyInfo[] properties = trainee.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType == typeof(string))
                {
                    string propertyName = property.Name;
                    string value = (string)property.GetValue(trainee);
                    if (string.IsNullOrWhiteSpace(value))
                    {
                        requiredFields.Add(propertyName);
                    }
                }
            }

            if (requiredFields.Count < 1)
            {
                traineesRepository.UpdateTrainee(trainee);

                return new
                {
                    response = "Success",
                    requiredFields = requiredFields
                };
            }

            return new
            {
                response = "Failed",
                requiredFields = requiredFields
            };

        }
        [HttpDelete]
        
        public object DeleteTrainee(Trainee trainee)
        {
            traineesRepository.DeleteTrainee(trainee);
            return new
            {
                response = "Success"
            };
        }
    }
}
