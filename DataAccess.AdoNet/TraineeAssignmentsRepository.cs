using Domain;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.ViewModels;
using Configuration;

namespace DataAccess.AdoNet
{
    public class TraineeAssignmentsRepository
    {
        SqlConnection sqlConnection;
        private readonly AppSettings appSettings;

        public TraineeAssignmentsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<TraineeAssignmentViewModel> GetTraineeAssignments()
        {
           List<TraineeAssignmentViewModel> traineeAssignments = new List<TraineeAssignmentViewModel>();
            SqlCommand sqlCommand = new SqlCommand("spTraineeAssignment", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataset = new DataSet();
            sqlDataAdapter.Fill(dataset,"TraineeAssignments");

            foreach (DataRow item in dataset.Tables[0].Rows)
            {
                TraineeAssignmentViewModel trainee = new TraineeAssignmentViewModel()
                {
                    AssignmentId = int.Parse(item["AssignmentId"].ToString()),
                    Assignment = item["Asssignment"].ToString(),
                    Status = (item["Status"].ToString()),
                    Score = int.Parse(item["Score"].ToString()),
                    Remarks = (item["Remarks"].ToString()),
                    TraineeName = (item["TraineeName"].ToString()),

                };

                traineeAssignments.Add(trainee);
            }

            return traineeAssignments;
        }


        public void AddAssignment(TraineeAssignment traineeAssignment)
        {
            SqlCommand sqlCommand = new SqlCommand("spTraineeAssignment", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@TraineeId", traineeAssignment.TraineeId);
            sqlCommand.Parameters.AddWithValue("@Assignment", traineeAssignment.Assignment);
            sqlCommand.Parameters.AddWithValue("@Status", traineeAssignment.Status);
            sqlCommand.Parameters.AddWithValue("@Score", traineeAssignment.Score);
            sqlCommand.Parameters.AddWithValue("@Remarks", traineeAssignment.Remarks);
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

        public void UpdateAssignment(TraineeAssignment traineeAssignment)
        {

            SqlCommand sqlCommand = new SqlCommand("spTraineeAssignment", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@AssignmentId", traineeAssignment.AssignmentId);
            sqlCommand.Parameters.AddWithValue("@Assignment", traineeAssignment.Assignment);
            sqlCommand.Parameters.AddWithValue("@Status", traineeAssignment.Status);
            sqlCommand.Parameters.AddWithValue("@Score", traineeAssignment.Score);
            sqlCommand.Parameters.AddWithValue("@Remarks", traineeAssignment.Remarks);
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

        public void UpdateAssignmentScore(int score,int id)
        {
            SqlCommand sqlCommand = new SqlCommand("spTraineeAssignment", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "m");
            sqlCommand.Parameters.AddWithValue("@AssignmentId", id);
            sqlCommand.Parameters.AddWithValue("@Score", score);

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
