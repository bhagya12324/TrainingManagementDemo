using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class BatchDetails
    {
        public int BatchDetailId { get; set; }
        public int BatchId { get; set; }
        public string Date { get; set; }
        public float HoursTaken { get; set; }
        public string TopicsTaken { get; set; }
        public string Remarks { get; set; }
    }
}
