using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class TraineeAssignmentViewModel
    {
        public string TraineeName { get; set; }
        public int AssignmentId { get; set; }
        public string Assignment { get; set; }
        public string Status { get; set; }
        public int Score { get; set; }
        public string Remarks { get; set; }
    }
}
