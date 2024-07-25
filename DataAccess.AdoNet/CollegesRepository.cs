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
    public class CollegesRepository
    {
        private readonly AppSettings appSettings;
        SqlConnection sqlConnection;

        public CollegesRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<College> GetColleges()
        {


            SqlCommand sqlCommand = new SqlCommand("spColleges", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);

            DataSet dataSet = new DataSet();

            adapter.Fill(dataSet, "Colleges");
            List<College> colleges = new List<College>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                College college = new College
                {
                    CollegeId   = Int32.Parse(row["CollegeId"].ToString()),
                    CollegeName = row["CollegeName"].ToString(),
                    Location    = row["location"].ToString(),
                    Remarks     =row["Remarks"].ToString()

                };
                colleges.Add(college);

            }
            return colleges;
        }
        //public void InsertCollege(College college)
        //{
        //    SqlCommand sqlCommand = new SqlCommand("spColleges", sqlConnection);
        //    sqlCommand.CommandType = CommandType.StoredProcedure;
        //    sqlCommand.Parameters.AddWithValue("@Option", "i");
        //    sqlCommand.Parameters.AddWithValue("@CollegeName", college.CollegeName);
        //    sqlCommand.Parameters.AddWithValue("@Location", college.Location);
        //    sqlCommand.Parameters.AddWithValue("@Remarks", college.Remarks);
            
            
        //    try
        //    {
        //        sqlConnection.Open();
        //        sqlCommand.ExecuteNonQuery();
        //    }
        //    finally
        //    {
        //       sqlConnection.Close();
        //    }
        //}

        public bool InsertCollege(College college)
        {
            SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Colleges WHERE CollegeName = @CollegeName",sqlConnection);
            sqlConnection.Open();
            command.Parameters.AddWithValue("@CollegeName", college.CollegeName);
            int count = (int)command.ExecuteScalar();
            sqlConnection.Close();
            if (count > 0)
            {
                // College name already exists
                return false;
            }
            else
            {
                SqlCommand sqlCommand = new SqlCommand("spColleges", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@Option", "i");
                sqlCommand.Parameters.AddWithValue("@CollegeName", college.CollegeName);
                sqlCommand.Parameters.AddWithValue("@Location", college.Location);
                sqlCommand.Parameters.AddWithValue("@Remarks", college.Remarks);


                try
                {
                    sqlConnection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
                finally
                {
                   sqlConnection.Close();
                }
                return true;
            }
        }

        public bool UpdateCollege(College college)
        {
            SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Colleges WHERE CollegeName=@CollegeName AND CollegeId != @CollegeId ", sqlConnection);
            sqlConnection.Open();
            command.Parameters.AddWithValue("@CollegeName", college.CollegeName);
            command.Parameters.AddWithValue("@CollegeId", college.CollegeId);
            int count = (int)command.ExecuteScalar();
            sqlConnection.Close();
            if (count > 0)
            {

                return false;
            }
            else
            {
                SqlCommand sqlCommand = new SqlCommand("spColleges", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@Option", "u");
                sqlCommand.Parameters.AddWithValue("@CollegeName", college.CollegeName);
                sqlCommand.Parameters.AddWithValue("@Location", college.Location);
                sqlCommand.Parameters.AddWithValue("@Remarks", college.Remarks);


                try
                {
                    sqlConnection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
                finally
                {
                    sqlConnection.Close();
                }
                return true;
            }
        }


        //public void UpdateCollege(College college)
        //{
        //     SqlCommand sqlCommand = new SqlCommand("spColleges", sqlConnection);
        //    sqlCommand.CommandType = CommandType.StoredProcedure;
        //    sqlCommand.Parameters.AddWithValue("@Option", "u");

        //    sqlCommand.Parameters.AddWithValue("@CollegeId", college.CollegeId);
        //    sqlCommand.Parameters.AddWithValue("@CollegeName", college.CollegeName);
        //    sqlCommand.Parameters.AddWithValue("@Location", college.Location);
        //    sqlCommand.Parameters.AddWithValue("@Remarks", college.Remarks);

        //    try
        //    {
        //        sqlConnection.Open();
        //        sqlCommand.ExecuteNonQuery();
        //    }
        //    finally
        //    {
        //       sqlConnection.Close();
        //    }
        //}

        public List<string> getTrainees(int id)
		{
            List<string> trainees = new List<string>();
            SqlCommand sqlCommand = new SqlCommand("select TraineeName from Trainees where CollegeId =@id",sqlConnection);

            sqlCommand.Parameters.AddWithValue("@id",id);
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);

            DataSet dataSet = new DataSet();

            adapter.Fill(dataSet, "Trainees");
            List<College> colleges = new List<College>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                string trainee = row["TraineeName"].ToString();
                trainees.Add(trainee);

            }
            return trainees;
        }
    }
}
