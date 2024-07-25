using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class CollegesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CollegeHome()
        {
            return View();
        }
    }
}
