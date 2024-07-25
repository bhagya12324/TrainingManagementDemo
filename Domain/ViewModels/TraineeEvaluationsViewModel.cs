using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class TraineeEvaluationsViewModel
    {
        public int TraineeId { get; set; }
        public int EvaluationId { get; set; }
        public string EvaluationName { get; set; }
        public string TraineeName { get; set; }
        public int TraineeEvaluationId { get; set; }
        public float Score { get; set; }
        public string Remarks { get; set; }
    }
}
