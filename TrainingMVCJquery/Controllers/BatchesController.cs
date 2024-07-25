using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class BatchesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult BatchesHome()
        {
            return View();
        }
    }
}
