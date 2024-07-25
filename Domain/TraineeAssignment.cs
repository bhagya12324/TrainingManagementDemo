using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class TraineeAssignment
    {
        public int AssignmentId { get; set; }
        public int TraineeId { get; set; }
        public string Assignment { get; set; }
        public string Status { get; set; }
        public float  Score { get; set; }
        public string Remarks { get; set; }
    }
}
