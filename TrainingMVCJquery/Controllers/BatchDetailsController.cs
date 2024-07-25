using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class BatchDetailsController : Controller
    {
        public IActionResult BatchDetailsHome()
        {
            return View();
        }
    }
}
