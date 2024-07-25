using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class TraineeEvaluations : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult TraineeEvaluationsHome()
        {
            return View();
        }
    }
}
