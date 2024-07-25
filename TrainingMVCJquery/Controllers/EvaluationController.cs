using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class EvaluationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult EvaluationHome()
        {
            return View();
        }
    }
}
