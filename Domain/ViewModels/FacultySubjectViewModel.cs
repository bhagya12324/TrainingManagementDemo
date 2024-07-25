using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class FacultySubjectViewModel
    {
        public int FacultyId { get; set; }
        public string FacultyName { get; set; }
        public List<string> Subjects { get; set; }
        public string Remarks { get; set; }
    }
}
