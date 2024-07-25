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
    public class BatchesDetailsController : ControllerBase
    {
        public BatchesDetailsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            batchDetailsRepository = new BatchDetailsRepository(this.appSettings);
        }
        BatchDetailsRepository batchDetailsRepository;
        
        private readonly AppSettings appSettings;

        [HttpGet]
        public List<BatchDetailsViewModel> GetBatchDetails()
        {
            var batchDetails = batchDetailsRepository.GetBatchDetails();
            return batchDetails;
        }
        [HttpPost]
        public object AddBatchDetails([FromBody] BatchDetails batchDetails)
        {
            batchDetailsRepository.AddBatchDetails(batchDetails);
            return new
            {
                response = "success"
            };
        }

        [HttpPost]
        public object UpdateBatchDetails([FromBody] BatchDetails batchDetails)
        {
            batchDetailsRepository.EditBatchDetails(batchDetails);
            return new
            {
                response = "success"
            };
        }

        [HttpPost]

        public List<BatchDetails> ShowBatchDetails(int id)
		{
           var batchDetails=batchDetailsRepository.ShowBatchDetails(id);
            return batchDetails;
        }
    }
}
