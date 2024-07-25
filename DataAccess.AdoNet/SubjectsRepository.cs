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
    public class SubjectsRepository
    {

        SqlConnection sqlConnection;
        private readonly AppSettings appSettings;

        public SubjectsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<Subject> GetSubjects()
        {
            SqlCommand sqlCommand = new SqlCommand("spSubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "Subjects");
            List<Subject> subjects = new List<Subject>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                Subject subject = new Subject
                {
                    SubjectId    = Int32.Parse(row["SubjectId"].ToString()),
                    SubjectName  = row["SubjectName"].ToString(),
                    Remarks      = row["Remarks"].ToString()

                };
                subjects.Add(subject);
            }

            return subjects;
        }
        public void InsertSubjects(Subject subject)
        {
            SqlCommand sqlCommand = new SqlCommand("spSubjects", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@SubjectName", subject.SubjectName);
            sqlCommand.Parameters.AddWithValue("@Remarks", subject.Remarks);

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
        public void UpdateSubjects(Subject subject)
        {
            SqlCommand sqlCommand = new SqlCommand("spSubjects",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@SubjectId", subject.SubjectId);
            sqlCommand.Parameters.AddWithValue("@SubjectName", subject.SubjectName);
            sqlCommand.Parameters.AddWithValue("@Remarks", subject.Remarks);

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
