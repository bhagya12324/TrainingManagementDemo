using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FacultySubject
    {
        public int FacultySubjectId { get; set; }
        public int FacultyId { get; set; }
        public int SubjectId { get; set; }
        public string Remarks { get; set; }
        public string Discontinue { get; set; }
    }
}
