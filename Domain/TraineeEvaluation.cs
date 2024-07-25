using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{   
    public  class TraineeEvaluation
    {
        public int TraineeEvaluationId { get; set; }
        public int EvaluationId { get; set; }
        public int TraineeId { get; set; }
        public float Score { get; set; }
        public string Remarks { get; set; }
    }
}
