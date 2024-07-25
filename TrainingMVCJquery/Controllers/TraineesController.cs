using Microsoft.AspNetCore.Mvc;

namespace TrainingMVCJquery.Controllers
{
    public class TraineesController : Controller
    {
        public IActionResult TraineesHomePage()
        {
            return View();
        }
    }
}
