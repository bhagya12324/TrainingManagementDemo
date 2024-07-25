using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class FacultiesController : Controller
    {
        public IActionResult HomePage()
        {
            return View();
        }
    }
}
