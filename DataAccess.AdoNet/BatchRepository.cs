using Configuration;
using Domain;
using System.Data;
using System.Data.SqlClient;

namespace DataAccess.AdoNet
{
    public class BatchesRepository
    {
        public SqlConnection sqlConnection;
        public BatchesRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        private readonly AppSettings appSettings;
    
        public List<Batch> GetBatches()
        {
            List<Batch> batches = new List<Batch>();
               

            SqlCommand sqlCommand = new SqlCommand("spBatches", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);

            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet,"Batches");

            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                DateTime enddate = DateTime.Parse(row["EndDate"].ToString());
                DateTime startdate = DateTime.Parse(row["StartDate"].ToString());
                DateTime tentativeenddate = DateTime.Parse(row["TentativeEndDate"].ToString());

                Batch batch = new Batch()
                {
                    BatchId = Int32.Parse(row["BatchId"].ToString()),
                    BatchName = row["BatchName"].ToString(),
                    Details = row["Details"].ToString(),
                    Duration = float.Parse(row["Duration"].ToString()),
                    EndDate = enddate.ToString("dd-MMM-yyyy"),
                    Fees = float.Parse(row["Fees"].ToString()),
                    FeesPaid = float.Parse(row["FeesPaid"].ToString()),
                    HoursTaken = float.Parse(row["HoursTaken"].ToString()),
                    TentativeEndDate = tentativeenddate.ToString("dd-MMM-yyyy"),
                    StartDate = startdate.ToString("dd-MMM-yyyy"),
                    Status = row["Status"].ToString(),
                    Remarks = row["Remarks"].ToString(),
                };
                batches.Add(batch);
            }    
            return batches;
        }

        public bool InsertBatch(Batch batch)
        {
            SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Batches WHERE BatchName = @BatchName", sqlConnection);

           sqlConnection.Open();
            
            command.Parameters.AddWithValue("@BatchName", batch.BatchName);
            int count = (int)command.ExecuteScalar();

            sqlConnection.Close();
            if (count > 0)
            {
                // Batch name already exists
                return false;
            }
            else
            {
                SqlCommand sqlCommand = new SqlCommand("spBatches", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@Option", "insert");
                sqlCommand.Parameters.AddWithValue("@BatchName", batch.BatchName);
                sqlCommand.Parameters.AddWithValue("@StartDate", batch.StartDate);
                sqlCommand.Parameters.AddWithValue("@TentativeEndDate", batch.TentativeEndDate);
                sqlCommand.Parameters.AddWithValue("@EndDate", batch.EndDate);
                sqlCommand.Parameters.AddWithValue("@Fees", batch.Fees);
                sqlCommand.Parameters.AddWithValue("@FeesPaid", batch.FeesPaid);
                sqlCommand.Parameters.AddWithValue("@Duration", batch.Duration);
                sqlCommand.Parameters.AddWithValue("@HoursTaken", batch.HoursTaken);
                sqlCommand.Parameters.AddWithValue("@Status", batch.Status);
                sqlCommand.Parameters.AddWithValue("@Details", batch.Details);
                sqlCommand.Parameters.AddWithValue("@Remarks", batch.Remarks);
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

        public bool UpdateBatch(Batch batch)
        {
            SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Batches WHERE BatchName = @BatchName AND BatchId != @BatchId", sqlConnection);

            sqlConnection.Open();
            command.Parameters.AddWithValue("@BatchName", batch.BatchName);
            command.Parameters.AddWithValue("@BatchId", batch.BatchId);

            int count = (int)command.ExecuteScalar();
            sqlConnection.Close();
            if (count > 0)
            {
                // Batch name already exists
                return false;
            }
            else
            {
                SqlCommand sqlCommand = new SqlCommand("spBatches", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@Option", "update");
                sqlCommand.Parameters.AddWithValue("@BatchId", batch.BatchId);
                sqlCommand.Parameters.AddWithValue("@BatchName", batch.BatchName);
                sqlCommand.Parameters.AddWithValue("@StartDate", batch.StartDate);
                sqlCommand.Parameters.AddWithValue("@TentativeEndDate", batch.TentativeEndDate);
                sqlCommand.Parameters.AddWithValue("@EndDate", batch.EndDate);
                sqlCommand.Parameters.AddWithValue("@Fees", batch.Fees);
                sqlCommand.Parameters.AddWithValue("@FeesPaid", batch.FeesPaid);
                sqlCommand.Parameters.AddWithValue("@Duration", batch.Duration);
                sqlCommand.Parameters.AddWithValue("@HoursTaken", batch.HoursTaken);
                sqlCommand.Parameters.AddWithValue("@Status", batch.Status);
                sqlCommand.Parameters.AddWithValue("@Details", batch.Details);
                sqlCommand.Parameters.AddWithValue("@Remarks", batch.Remarks);

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
    }
}