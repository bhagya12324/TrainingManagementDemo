using DataAccess.AdoNet;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain.ViewModels;
using Configuration;

namespace TrainingWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class FacultiesSubjectsController : ControllerBase
    {
        public FacultiesSubjectsController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            facultiesSubjectsRepository = new FacultiesSubjectsRepository(this.appSettings);
        }
        FacultiesSubjectsRepository facultiesSubjectsRepository;

        private readonly AppSettings appSettings;
        [HttpGet]
        public List<FacultySubject> GetFaculties()
        {
            var facultiesSubjects = facultiesSubjectsRepository.GetFacultiesSubjects();
            return facultiesSubjects;
        }

        [HttpGet]
        public List<FacultySubjectViewModel> GetFacultySubjectRemarks()
        {
            List<int> facultyIds = new List<int>();
            List<FacultySubjectViewModel> facultySubjectViewModels = new List<FacultySubjectViewModel>();


            var facultiesSubjectsRemarks = facultiesSubjectsRepository.GetFacultySubjectRemarks();
            foreach (var faculty in facultiesSubjectsRemarks)
            {
                FacultySubjectViewModel facultySubjectViewModel = new FacultySubjectViewModel();

                if (!facultyIds.Contains(faculty.FacultyId))
                {
                    facultyIds.Add(faculty.FacultyId);
                    List<string> subjects = new List<string>();
                    if (!string.IsNullOrEmpty(faculty.SubjectName))
                    {
                        subjects.Add(faculty.SubjectName);
                    }
                    facultySubjectViewModel.FacultyId = faculty.FacultyId;
                    facultySubjectViewModel.FacultyName = faculty.FacultyName;
                    facultySubjectViewModel.Subjects = subjects;
                    facultySubjectViewModel.Remarks = faculty.Remarks;
                    facultySubjectViewModels.Add(facultySubjectViewModel);

                }
                else
                {
                    var obj = facultySubjectViewModels.FirstOrDefault(x => x.FacultyId == faculty.FacultyId);
                    if (obj != null) obj.Subjects.Add(faculty.SubjectName);
                }
            }

            return facultySubjectViewModels;
        }

        [HttpPost]
        public object InsertFacultySubject([FromBody] FacultySubject facultySubject)
        {

            facultiesSubjectsRepository.InsertFacultySubject(facultySubject);

            return new
            {
                message = "success"
            };
        }
        [HttpPost]
        public object UpdateFacultySubject([FromBody] FacultySubject facultySubject)
        {

            facultiesSubjectsRepository.UpdateFacultySubject(facultySubject);

            return new
            {
                message = "success"
            };
        }
    }
}
