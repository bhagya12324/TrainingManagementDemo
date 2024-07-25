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
    public class FacultiesRepository
    {
        private readonly AppSettings appSettings;
        public SqlConnection sqlConnection;

        public FacultiesRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);

        }
        public List<Faculty> GetFaculties()
        {
            SqlCommand sqlCommand = new SqlCommand("spFaculties", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "Faculties");
            List<Faculty> faculties = new List<Faculty>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                Faculty faculty = new Faculty
                {
                   FacultyId    = Int32.Parse(row["FacultyId"].ToString()),
                   FacultyName  = row["FacultyName"].ToString(),
                   Remarks      = row["Remarks"].ToString(),
                   Discontinue  = row["Discontinue"].ToString()

                };
                faculties.Add(faculty);
            }

            return faculties;
        }

        public Faculty ShowFaculty(int id)
        {


            Faculty faculty = new Faculty();
            SqlCommand command = new SqlCommand("Select * from Faculties where FacultyId=@id", sqlConnection);
            command.Parameters.AddWithValue("@id", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet, "Faculties");
            foreach (DataRow item in dataSet.Tables[0].Rows)
            {
                faculty.FacultyId = int.Parse(item["FacultyId"].ToString());
                faculty.FacultyName = item["FacultyName"].ToString();
                faculty.Remarks = item["Remarks"].ToString();
            }
            return faculty;
        }
        public void InsertFaculties(Faculty faculty)
        {
            SqlCommand sqlCommand = new SqlCommand("spFaculties", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@FacultyName", faculty.FacultyName);
            sqlCommand.Parameters.AddWithValue("@Remarks", faculty.Remarks);

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
        public void UpdateFaculties(Faculty faculty)
        {
            SqlCommand sqlCommand = new SqlCommand("spFaculties", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@FacultyId", faculty.FacultyId);
            sqlCommand.Parameters.AddWithValue("@FacultyName", faculty.FacultyName);
            sqlCommand.Parameters.AddWithValue("@Remarks", faculty.Remarks);

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
        public void DeleteFaculties(Faculty faculty)
        {
            SqlCommand sqlCommand = new SqlCommand("spFaculties",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "d");
            sqlCommand.Parameters.AddWithValue("@FacultyId", faculty.FacultyId);
            sqlCommand.Parameters.AddWithValue("@Discontinue", faculty.Discontinue);

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
