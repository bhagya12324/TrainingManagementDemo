using Configuration;
using DataAccess.AdoNet;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CollegesController : ControllerBase
    {
        public CollegesController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            collegesRepository = new CollegesRepository(this.appSettings);
        }

        CollegesRepository collegesRepository;
        private readonly AppSettings appSettings;
        //CollegesRepository collegesRepository = new CollegesRepository();
        [HttpGet]
        public List<College> GetColleges()
        {
            var colleges = collegesRepository.GetColleges();
            return colleges;
        }
        [HttpPost]
        public object InsertCollege([FromBody] College college)
        {
            bool success = collegesRepository.InsertCollege(college);
            if (!success)
            {
                return BadRequest("CollegeName already exists.");
            }
            else
            {
                return Ok();
            }
        }

        //List<string> requiredFields = new List<string>();
        //// validations
        //PropertyInfo[] properties = college.GetType().GetProperties();
        //foreach (PropertyInfo property in properties)
        //{
        //    if (property.PropertyType == typeof(string))
        //    {
        //        string propertyName = property.Name;
        //        string value = (string)property.GetValue(college);
        //        if (string.IsNullOrWhiteSpace(value))
        //        {
        //            requiredFields.Add(propertyName);
        //        }
        //    }
        //}

        //if (requiredFields.Count < 1)
        //{
        //    collegesRepository.InsertCollege(college);

        //    return new
        //    {
        //        response = "Success",
        //        requiredFields = requiredFields
        //    };
        //}

        //return new
        //{
        //    response = "Failed",
        //    requiredFields = requiredFields
        //};

        [HttpPost]
        public object UpdateCollege([FromBody] College college)
        {
            bool success = collegesRepository.UpdateCollege(college);
            if (!success)
            {
                return BadRequest("CollegeName already exists.");
            }
            else
            {
                return Ok();
            }
        }
    }
}

  //          List<string> requiredFields = new List<string>();
  //          // validations
  //          PropertyInfo[] properties = college.GetType().GetProperties();
  //          foreach (PropertyInfo property in properties)
  //          {
  //              if (property.PropertyType == typeof(string))
  //              {
  //                  string propertyName = property.Name;
  //                  string value = (string)property.GetValue(college);
  //                  if (string.IsNullOrWhiteSpace(value))
  //                  {
  //                      requiredFields.Add(propertyName);
  //                  }
  //              }
  //          }

  //          if (requiredFields.Count < 1)
  //          {
  //              collegesRepository.UpdateCollege(college);

  //              return new
  //              {
  //                  response = "Success",
  //                  requiredFields = requiredFields
  //              };
  //          }

  //          return new
  //          {
  //              response = "Failed",
  //              requiredFields = requiredFields
  //          };
  //      }

  //      [HttpPost]
  //      public List<string> GetTrainees(int id)
		//{
  //          List<string> trainees = collegesRepository.getTrainees(id);

  //          return trainees;
		//}
    //}
//}



