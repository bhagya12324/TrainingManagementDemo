using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class TraineeViewModel
    {
        public int TraineeId { get; set; }
        public string TraineeName { get; set; }
        public string TraineeLocation { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string BatchName { get; set; }
        public string CollegeName { get; set; }
        //Added BatchId and College Id since Edit Trainee requires these two properties
        public int BatchId { get; set; }
        public int CollegeId { get; set; }
    }
}
