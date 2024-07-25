using Configuration;
using DataAccess.AdoNet;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {

        public SubjectsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            subjectsRepository = new SubjectsRepository(this.appSettings);
        }
        SubjectsRepository subjectsRepository;

        private readonly AppSettings appSettings;

        [HttpGet]
        public List<Subject> GetSubjects()
        {
            var subjects = subjectsRepository.GetSubjects();
            return subjects;
        }
        [HttpPost]
        public object InsertSubjects([FromBody] Subject subject)
        {

            subjectsRepository.InsertSubjects(subject);

            return new
            {
                message = "success"
            };
        }
        [HttpPost]
        public object UpdateSubjects([FromBody] Subject subject)
        {

            subjectsRepository.UpdateSubjects(subject);

            return new
            {
                message = "success"
            };
        }
    }
}
