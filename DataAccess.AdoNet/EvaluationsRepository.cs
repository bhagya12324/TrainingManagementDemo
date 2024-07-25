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
    public class EvaluationsRepository
    {
        private readonly AppSettings appSettings;
        SqlConnection sqlConnection;
        public EvaluationsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<EvaluationViewModel> GetEvaluations()
        {
            List<EvaluationViewModel> evaluations = new List<EvaluationViewModel>();

            SqlCommand sqlCommand = new SqlCommand("spEvaluations", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);

            DataSet dataSet = new DataSet();

            adapter.Fill(dataSet, "Evaluations");
            //List<Evaluation> evaluations = new List<Evaluation>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                DateTime date = DateTime.Parse(row["Date"].ToString());
                EvaluationViewModel evaluation = new EvaluationViewModel

                {
                    EvaluationId    = Int32.Parse(row["EvaluationId"].ToString()),
                   BatchName = row["BatchName"].ToString(),
                   EvaluationName  = row["EvaluationName"].ToString(),
                    Date = date.ToString("dd-MMM-yyyy"),
                    Topic           = row["Topic"].ToString(),
                    Question        = row["Question"].ToString(),
                    Description     = row["Description"].ToString(),


               };
              evaluations.Add(evaluation);

            }
            return evaluations;
        }
        public void InsertEvaluation(Evaluation evaluation)
        {
            SqlCommand sqlCommand = new SqlCommand("spEvaluations",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "i");

            sqlCommand.Parameters.AddWithValue("@BatchId", evaluation.BatchId);

            sqlCommand.Parameters.AddWithValue("@EvaluationName", evaluation.EvaluationName);
            sqlCommand.Parameters.AddWithValue("@Date", evaluation.Date);
            sqlCommand.Parameters.AddWithValue("@Topic", evaluation.Topic);
            sqlCommand.Parameters.AddWithValue("@Question", evaluation.Question);
            sqlCommand.Parameters.AddWithValue("@Description", evaluation.Description);




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

        //public bool InsertSameCollege(Evaluation evaluation)
        //{
        //    SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Evaluations WHERE BatchName=@BatchName and EvaluationName = @EvaluationName", sqlConnection);
        //    sqlConnection.Open();
        //    command.Parameters.AddWithValue("@CollegeName", college.CollegeName);
        //    int count = (int)command.ExecuteScalar();
        //    sqlConnection.Close();
        //    if (count > 0)
        //    {
        //        // College name already exists
        //        return false;
        //    }
        //    else
        //    {
        //        SqlCommand sqlCommand = new SqlCommand("spEvaluations", sqlConnection);
        //        sqlCommand.CommandType = CommandType.StoredProcedure;
        //        sqlCommand.Parameters.AddWithValue("@Option", "i");

        //        sqlCommand.Parameters.AddWithValue("@BatchId", evaluation.BatchId);

        //        sqlCommand.Parameters.AddWithValue("@EvaluationName", evaluation.EvaluationName);
        //        sqlCommand.Parameters.AddWithValue("@Date", evaluation.Date);
        //        sqlCommand.Parameters.AddWithValue("@Topic", evaluation.Topic);
        //        sqlCommand.Parameters.AddWithValue("@Question", evaluation.Question);
        //        sqlCommand.Parameters.AddWithValue("@Description", evaluation.Description);


        //        try
        //        {
        //            sqlConnection.Open();
        //            sqlCommand.ExecuteNonQuery();
        //        }
        //        finally
        //        {
        //            sqlConnection.Close();
        //        }
        //        return true;
        //    }
        //}




        public void UpdateEvaluation(Evaluation evaluation)
        {
            SqlCommand sqlCommand = new SqlCommand("spEvaluations", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@BatchId", evaluation.BatchId);
            sqlCommand.Parameters.AddWithValue("@EvaluationId", evaluation.EvaluationId);
            sqlCommand.Parameters.AddWithValue("@EvaluationName", evaluation.EvaluationName);
            sqlCommand.Parameters.AddWithValue("@Date", evaluation.Date);
            sqlCommand.Parameters.AddWithValue("@Topic", evaluation.Topic);
            sqlCommand.Parameters.AddWithValue("@Question", evaluation.Question);
            sqlCommand.Parameters.AddWithValue("@Description", evaluation.Description);

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

