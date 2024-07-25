using Configuration;
using DataAccess.AdoNet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class BatchesController : ControllerBase
    {
        public BatchesController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            batchesRepository = new BatchesRepository(this.appSettings);
        }

        BatchesRepository batchesRepository;
        private readonly AppSettings appSettings;
        [HttpGet]
       [AllowAnonymous]
        public List<Batch> GetBatches()
        {
            var batches = batchesRepository.GetBatches();
            return batches;
        }




        [HttpPost]

        public IActionResult InsertBatches([FromBody] Batch batch)
        {

            bool success = batchesRepository.InsertBatch(batch);
            if (!success)
            {
                return BadRequest("BatchName already exists.");
            }
            else
            {
                return Ok();
            }
        }
        //    List<string> requiredFields = new List<string>();
        //    // validations
        //    PropertyInfo[] properties = batch.GetType().GetProperties();
        //    foreach (PropertyInfo property in properties)
        //    {
        //        if (property.PropertyType == typeof(string))
        //        {
        //            string propertyName = property.Name;
        //            string value = (string)property.GetValue(batch);
        //            if (string.IsNullOrWhiteSpace(value))
        //            {
        //                requiredFields.Add(propertyName);
        //            }
        //        }
        //    }

        //    if (requiredFields.Count < 1)
        //    {
        //        batchesRepository.InsertBatch(batch);

        //        return new
        //        {
        //            response = "Success",
        //            requiredFields = requiredFields
        //        };
        //    }

        //    return new
        //    {
        //        response = "Failed",
        //        requiredFields = requiredFields
        //    };


        //}

       


        [HttpPost]

        public IActionResult UpdateBatch([FromBody] Batch batch)
        {


            bool success = batchesRepository.UpdateBatch(batch);
            if (!success)
            {
                return BadRequest("BatchName already exists.");
            }
            else
            {
                return Ok();
            }
            //List<string> requiredFields = new List<string>();
            //// validations
            //PropertyInfo[] properties = batch.GetType().GetProperties();
            //foreach (PropertyInfo property in properties)
            //{
            //    if (property.PropertyType == typeof(string))
            //    {
            //        string propertyName = property.Name;
            //        string value = (string)property.GetValue(batch);
            //        if (string.IsNullOrWhiteSpace(value))
            //        {
            //            requiredFields.Add(propertyName);
            //        }
            //    }
            //}

            //if (requiredFields.Count < 1)
            //{
            //    batchesRepository.UpdateBatch(batch);

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

        }
    }
}
