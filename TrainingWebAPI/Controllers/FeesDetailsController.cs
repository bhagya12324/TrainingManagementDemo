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
    public class FeesDetailsController : ControllerBase
    {

        public FeesDetailsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            feeDetailsRepository = new FeeDetailsRepository(this.appSettings);
        }
        FeeDetailsRepository feeDetailsRepository;

        private readonly AppSettings appSettings;

        [HttpGet]
        public List<FeeDetailsViewModel> GetFeeDetails()
        {
            var feesDetails = feeDetailsRepository.GetFeeDetails();
            return feesDetails;
        }

        [HttpPost]
        public object AddFeeDetails([FromBody] FeeDetails feeDetails)
        {
            feeDetailsRepository.AddFeesDetails(feeDetails);
            return new
            {
                response = "Success"
            };
        }
        [HttpPost]
        public object EditFeeDetails([FromBody] FeeDetails feeDetails)
        {
            feeDetailsRepository.EditFeesDetails(feeDetails);
            return new
            {
                response = "Success"
            };
        }
    }
}
