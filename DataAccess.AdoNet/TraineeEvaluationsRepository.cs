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
    public class TraineeEvaluationsRepository
    {
        private readonly AppSettings appSettings;
        SqlConnection sqlConnection;
        public TraineeEvaluationsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<TraineeEvaluationsViewModel> GetTraineeEvaluations()
        {
            List<TraineeEvaluationsViewModel> traineeEvaluations = new List<TraineeEvaluationsViewModel>();
            SqlCommand sqlCommand = new SqlCommand("spTraineeEvaluations", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "TraineeEvaluations");

            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                TraineeEvaluationsViewModel traineeevaluation = new TraineeEvaluationsViewModel
                {
                    TraineeId = Int32.Parse(row["TraineeId"].ToString()),
                    EvaluationId = Int32.Parse(row["EvaluationId"].ToString()),

                    TraineeEvaluationId = Int32.Parse(row["TraineeEvaluationId"].ToString()),

                    EvaluationName = row["EvaluationName"].ToString(),
                    TraineeName = row["TraineeName"].ToString(),
                    Score = Int32.Parse(row["Score"].ToString()),
                    Remarks = row["Remarks"].ToString()

                };
                traineeEvaluations.Add(traineeevaluation);
            }

            return traineeEvaluations;
        }
        public void InsertTraineeEvaluation(TraineeEvaluation traineeEvaluation)
        {
            SqlCommand sqlCommand = new SqlCommand("spTraineeEvaluations", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");
            sqlCommand.Parameters.AddWithValue("@TraineeEvaluationId", traineeEvaluation.TraineeEvaluationId);
            sqlCommand.Parameters.AddWithValue("@EvaluationId", traineeEvaluation.EvaluationId);
            sqlCommand.Parameters.AddWithValue("@TraineeId", traineeEvaluation.TraineeId);
            sqlCommand.Parameters.AddWithValue("@Score", traineeEvaluation.Score);
            sqlCommand.Parameters.AddWithValue("@Remarks", traineeEvaluation.Remarks);

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
        public void UpdateTraineeEvaluation(TraineeEvaluation traineeEvaluation)
        {
            SqlCommand sqlCommand = new SqlCommand("spTraineeEvaluations", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");

            sqlCommand.Parameters.AddWithValue("@TraineeEvaluationId", traineeEvaluation.TraineeEvaluationId);
            sqlCommand.Parameters.AddWithValue("@EvaluationId", traineeEvaluation.EvaluationId);
            sqlCommand.Parameters.AddWithValue("@TraineeId", traineeEvaluation.TraineeId);
            sqlCommand.Parameters.AddWithValue("@Score", traineeEvaluation.Score);
            sqlCommand.Parameters.AddWithValue("@Remarks", traineeEvaluation.Remarks);

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

        public List<TraineeEvaluationViewModel> getTraineeEvalById(int id)
        {
            SqlCommand sqlCommand = new SqlCommand("spTraineeEvalDetails", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@TraineeId", id);
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();
            sqlDataAdapter.Fill(dataSet, "Evaluations");
            List<TraineeEvaluationViewModel> traineeEvaluations = new List<TraineeEvaluationViewModel>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                DateTime date = DateTime.Parse(row["Date"].ToString());
                TraineeEvaluationViewModel traineeevaluation = new TraineeEvaluationViewModel
                {
                    EvaluationName = row["EvaluationName"].ToString(),
                    Date = date.ToString("dd-MMM-yyyy"),
                    Question = row["Question"].ToString(),
                    Score = Int32.Parse(row["Score"].ToString()),
                    Remarks = row["Remarks"].ToString()

                };
                traineeEvaluations.Add(traineeevaluation);
            }

            return traineeEvaluations;
        }
    }
}

