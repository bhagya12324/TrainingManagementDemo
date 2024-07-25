using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Evaluation
    {
        public int EvaluationId { get; set; }

        public int BatchId { get; set; }


        public string EvaluationName { get; set; }

        public DateTime Date { get; set; }


        public string Topic { get; set; }

        public string Question { get; set; }
        public string Description { get; set; }





    }
}

