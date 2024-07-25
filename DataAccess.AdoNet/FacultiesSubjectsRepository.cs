using Configuration;
using Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.AdoNet
{
    public class FacultiesSubjectsRepository
    {
        private readonly AppSettings appSettings;
        public SqlConnection sqlConnection;

        public FacultiesSubjectsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);

        }
        public List<FacultySubject> GetFacultiesSubjects()
        {
            SqlCommand sqlCommand = new SqlCommand("spFacultySubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option","s");
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "FacultiesSubjects");
            List<FacultySubject> facultiesSubjects = new List<FacultySubject>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                FacultySubject facultySubject = new FacultySubject
                {
                    FacultySubjectId = Convert.ToInt32(row["FacultySubjectId"]),
                    FacultyId = Convert.ToInt32(row["FacultyId"]),
                    SubjectId = Convert.ToInt32(row["SubjectId"]),
                    Remarks = row["Remarks"].ToString(),
                    Discontinue = row["Discontinue"].ToString()
                };
                facultiesSubjects.Add(facultySubject);
            }

            return facultiesSubjects;
        }

        public List<FacultySubjectRemarks> GetFacultySubjectRemarks()
        {
            SqlCommand sqlCommand = new SqlCommand("spFacultySubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "FacultiesSubjects");
            List<FacultySubjectRemarks> facultiesSubjectsRemarks = new List<FacultySubjectRemarks>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                FacultySubjectRemarks facultiesSubjectsRemark = new FacultySubjectRemarks
                {
                    FacultyId = Int32.Parse(row["FacultyId"].ToString()),
                    FacultyName = row["FacultyName"].ToString(),
                    SubjectName = row["SubjectName"].ToString(),
                    Remarks = row["Remarks"].ToString()
                };
                facultiesSubjectsRemarks.Add(facultiesSubjectsRemark);
            }

            return facultiesSubjectsRemarks;
        }
        public void InsertFacultySubject(FacultySubject facultySubject)
        {
            SqlCommand sqlCommand = new SqlCommand("spFacultySubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@FacultyId", facultySubject.FacultyId);
            sqlCommand.Parameters.AddWithValue("@SubjectId", facultySubject.SubjectId);
            sqlCommand.Parameters.AddWithValue("@Remarks", facultySubject.Remarks);

            try
            {
               sqlConnection.Open();
                sqlCommand.ExecuteNonQuery();
            }
            finally
            {
                sqlConnection.Close();
            }
        }
        public void UpdateFacultySubject(FacultySubject facultySubject)
        {
            SqlCommand sqlCommand = new SqlCommand("spFacultySubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@FacultySubjectId", facultySubject.FacultySubjectId);
            sqlCommand.Parameters.AddWithValue("@FacultyId", facultySubject.FacultyId);
            sqlCommand.Parameters.AddWithValue("@SubjectId", facultySubject.SubjectId);
            sqlCommand.Parameters.AddWithValue("@Remarks", facultySubject.Remarks);
            try
            {
                sqlConnection.Open();
                sqlCommand.ExecuteNonQuery();
            }
            finally
            {
                sqlConnection.Close();
            }
        }
       
    }
}
