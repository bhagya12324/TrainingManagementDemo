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
    public class BatchDetailsRepository
    {
        private readonly AppSettings appSettings;
        public SqlConnection sqlConnection;

        public BatchDetailsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<BatchDetailsViewModel> GetBatchDetails()
        {
            SqlCommand sqlCommand = new SqlCommand("spBatchDetails",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);
            DataSet dataSet = new DataSet();

            adapter.Fill(dataSet,"BatchDetails");

            List<BatchDetailsViewModel> batchDetails = new List<BatchDetailsViewModel>();

            foreach (DataRow dataRow in dataSet.Tables[0].Rows)
            {
                DateTime date = DateTime.Parse(dataRow["Date"].ToString());
                BatchDetailsViewModel batchDetail = new BatchDetailsViewModel()
                {
                    BatchDetailId = int.Parse(dataRow["BatchDetailId"].ToString()),
                    BatchId = int.Parse(dataRow["BatchId"].ToString()),
                    BatchName = dataRow["BatchName"].ToString(),
                    Date = date.ToString("dd-MMM-yyyy"),
                    HoursTaken = float.Parse(dataRow["HoursTaken"].ToString()),
                    TopicsTaken = dataRow["TopicsTaken"].ToString(),
                    Remarks = dataRow["Remarks"].ToString() 
                };
                batchDetails.Add(batchDetail);
            }

            return  batchDetails;
        }

        public void AddBatchDetails(BatchDetails batchDetails)
        {
            SqlCommand sqlCommand = new SqlCommand("spBatchDetails",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@Option","i");
            sqlCommand.Parameters.AddWithValue("@BatchId", batchDetails.BatchId);
            sqlCommand.Parameters.AddWithValue("@Date", batchDetails.Date);
            sqlCommand.Parameters.AddWithValue("@HoursTaken", batchDetails.HoursTaken);
            sqlCommand.Parameters.AddWithValue("@TopicsTaken", batchDetails.TopicsTaken);
            sqlCommand.Parameters.AddWithValue("@Remarks", batchDetails.Remarks);

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

        public void EditBatchDetails(BatchDetails batchDetails)
        {
            SqlCommand sqlCommand = new SqlCommand("spBatchDetails", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@Option", "u");
            sqlCommand.Parameters.AddWithValue("@BatchDetailId", batchDetails.BatchDetailId);
            sqlCommand.Parameters.AddWithValue("@BatchId", batchDetails.BatchId);
            sqlCommand.Parameters.AddWithValue("@Date", batchDetails.Date);
            sqlCommand.Parameters.AddWithValue("@HoursTaken", batchDetails.HoursTaken);
            sqlCommand.Parameters.AddWithValue("@TopicsTaken", batchDetails.TopicsTaken);
            sqlCommand.Parameters.AddWithValue("@Remarks", batchDetails.Remarks);

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



        public List<BatchDetails> ShowBatchDetails(int id)
        {
            
            List<BatchDetails> batchDetails = new List<BatchDetails>();
            SqlCommand command = new SqlCommand("Select * from BatchDetails where BatchId=@id",sqlConnection);
            command.Parameters.AddWithValue("@id", id);

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet, "BatchDetails");

            foreach (DataRow item in dataSet.Tables[0].Rows)
            {
                DateTime date = DateTime.Parse(item["Date"].ToString());
                BatchDetails batchDetail = new BatchDetails()
                {
                    BatchDetailId = int.Parse(item["BatchDetailId"].ToString()),
                    BatchId = int.Parse(item["BatchId"].ToString()),
                    Date = date.ToString("dd-MMM-yyyy"),
                    HoursTaken = float.Parse(item["HoursTaken"].ToString()),
                    TopicsTaken = item["TopicsTaken"].ToString(),
                    Remarks = item["Remarks"].ToString()
            };
                batchDetails.Add(batchDetail);
                
            }
            return batchDetails;
        }


       

    }
}
