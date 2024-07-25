using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class SubjectsController : Controller
    {
        public IActionResult SubjectsHome()
        {
            return View();
        }
    }
}
