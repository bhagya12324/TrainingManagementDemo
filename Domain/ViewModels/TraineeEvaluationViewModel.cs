using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class TraineeEvaluationViewModel
    {
        public string EvaluationName { get; set; }
        public string Date { get; set; }
        public string Question { get; set; }
        public int Score { get; set; }
        public string Remarks { get; set; }

    }
}

