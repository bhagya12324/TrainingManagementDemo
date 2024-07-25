using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
   public  class Trainee
    {
        public int TraineeId { get; set; }
        public int BatchId { get; set; }
        public int  CollegeId { get; set; }
        public string TraineeName { get; set; }
        public string TraineeLocation { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Discontinue{ get; set; }


    }
}
