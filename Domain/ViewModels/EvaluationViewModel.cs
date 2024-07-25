using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class EvaluationViewModel
    {
        public string BatchName { get; set; }
        public int EvaluationId { get; set; }
        public string EvaluationName { get; set; }
        public string Date { get; set; }
        public string Topic { get; set; }
        public string Question { get; set; }
        public string Description{ get; set; }
    }
}
