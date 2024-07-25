using Configuration;
using Domain;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.AdoNet
{
    public class TraineesRepository
    {
        SqlConnection sqlConnection;
        private readonly AppSettings appSettings;

        public TraineesRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<TraineeViewModel> GetTrainees()
        {
            List<TraineeViewModel> trainees = new List<TraineeViewModel>();

            SqlCommand sqlCommand = new SqlCommand("spTrainees",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);

            DataSet dataSet = new DataSet();

            adapter.Fill(dataSet, "Trainees");

            foreach (DataRow item in dataSet.Tables["Trainees"].Rows)
            {
                TraineeViewModel trainee = new TraineeViewModel()
                {
                    TraineeId = Int32.Parse(item["TraineeId"].ToString()),
                    BatchName = item["BatchName"].ToString(),
                    CollegeName = item["CollegeName"].ToString(),
                    TraineeName = item["TraineeName"].ToString(),
                    TraineeLocation = item["TraineeLocation"].ToString(),
                    Email = item["Email"].ToString(),
                    Phone = item["Phone"].ToString(),
                    //since edit requires batch id and college id View Models needs two more properties
                    BatchId = Int32.Parse(item["BatchId"].ToString()),
                    CollegeId = Int32.Parse(item["CollegeId"].ToString())
                };

                trainees.Add(trainee);  

           }
            return trainees;
        }
        public void InsertTrainee(Trainee trainee)
        {
            SqlCommand sqlCommand = new SqlCommand("spTrainees", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@BatchId", trainee.BatchId);
            sqlCommand.Parameters.AddWithValue("@CollegeId", trainee.CollegeId);
            sqlCommand.Parameters.AddWithValue("@TraineeName", trainee.TraineeName);
            sqlCommand.Parameters.AddWithValue("@TraineeLocation", trainee.TraineeLocation);
            sqlCommand.Parameters.AddWithValue("@Email", trainee.Email);
            sqlCommand.Parameters.AddWithValue("@Phone", trainee.Phone);
            sqlCommand.Parameters.AddWithValue("@Discontinue", trainee.Discontinue);

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

      public void UpdateTrainee(Trainee trainee)
        {
            SqlCommand sqlCommand = new SqlCommand("spTrainees", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@TraineeId", trainee.TraineeId);
            sqlCommand.Parameters.AddWithValue("@BatchId", trainee.BatchId);
            sqlCommand.Parameters.AddWithValue("@CollegeId", trainee.CollegeId);
            sqlCommand.Parameters.AddWithValue("@TraineeName", trainee.TraineeName);
            sqlCommand.Parameters.AddWithValue("@TraineeLocation", trainee.TraineeLocation);
            sqlCommand.Parameters.AddWithValue("@Email", trainee.Email);
            sqlCommand.Parameters.AddWithValue("@Phone", trainee.Phone);
           

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

        public void DeleteTrainee(Trainee trainee)
        {
            SqlCommand sqlCommand = new SqlCommand("spTrainees",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "d");
            sqlCommand.Parameters.AddWithValue("@TraineeId", trainee.TraineeId);

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
