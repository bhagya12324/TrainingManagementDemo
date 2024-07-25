using Configuration;
using DataAccess.AdoNet;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacultiesController : ControllerBase
    {

        public FacultiesController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            facultiesRepository = new FacultiesRepository(this.appSettings);
        }
        FacultiesRepository facultiesRepository;

        private readonly AppSettings appSettings;
        
        [HttpGet]
        public List<Faculty> GetFaculties()
        {
            var faculties = facultiesRepository.GetFaculties();
            return faculties;
        }

        [HttpGet]
        public Faculty ShowFaculty(int id)
        {
            var faculty = facultiesRepository.ShowFaculty(id);
            return faculty;
        }
        [HttpPost]
        public object InsertFaculties([FromBody] Faculty faculty)
        {


            List<string> requiredFields = new List<string>();
            // validations
            PropertyInfo[] properties = faculty.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType == typeof(string))
                {
                    string propertyName = property.Name;
                    string value = (string)property.GetValue(faculty);
                    if (string.IsNullOrWhiteSpace(value))
                    {
                        requiredFields.Add(propertyName);
                    }
                }
            }

            if (requiredFields.Count < 1)
            {
                facultiesRepository.InsertFaculties(faculty);

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
        public object UpdateFaculties([FromBody] Faculty faculty)
        {


            List<string> requiredFields = new List<string>();
            // validations
            PropertyInfo[] properties = faculty.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType == typeof(string))
                {
                    string propertyName = property.Name;
                    string value = (string)property.GetValue(faculty);
                    if (string.IsNullOrWhiteSpace(value))
                    {
                        requiredFields.Add(propertyName);
                    }
                }
            }

            if (requiredFields.Count < 1)
            {
                facultiesRepository.UpdateFaculties(faculty);

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
        public object DeleteFaculties([FromBody] Faculty faculty)
        {

            facultiesRepository.DeleteFaculties(faculty);

            return new
            {
                message = "success"
            };
        }
    }
}
