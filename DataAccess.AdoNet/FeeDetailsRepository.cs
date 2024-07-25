using Domain;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Configuration;
using Domain.ViewModels;

namespace DataAccess.AdoNet
{
    public class FeeDetailsRepository
    {
        SqlConnection sqlConnection;
        private readonly AppSettings appSettings;

        public FeeDetailsRepository(AppSettings appSettings)
        {
            this.appSettings = appSettings;
            sqlConnection = new SqlConnection(appSettings.ConnectionStrings.DefaultConnection);
        }
        public List<FeeDetailsViewModel> GetFeeDetails()
        {
            List<FeeDetailsViewModel> feeDetails = new List<FeeDetailsViewModel>();

            SqlCommand sqlCommand = new SqlCommand("spFeesDetails",sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(sqlCommand);    
            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet, "FeesDetails");


            foreach (DataRow item in dataSet.Tables[0].Rows)
            {
                DateTime enddate = DateTime.Parse(item["Date"].ToString());
                FeeDetailsViewModel feeDetail = new FeeDetailsViewModel()
                {
                    FeesId = int.Parse(item["FeesId"].ToString()),
                    BatchId = int.Parse(item["BatchId"].ToString()),
                    BatchName = item["BatchName"].ToString(),
                    Date = enddate.ToString("dd-MMM-yyyy"),
                    Amount = float.Parse(item["Amount"].ToString()),
                    Remarks = item["Remarks"].ToString()
                };
                feeDetails.Add(feeDetail);
            }
            return feeDetails;
        }

        public void AddFeesDetails(FeeDetails feeDetails)
        {
            SqlCommand sqlCommand = new SqlCommand("spFeesDetails", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@Option",'i');

            sqlCommand.Parameters.AddWithValue("@BatchId", feeDetails.BatchId);
            sqlCommand.Parameters.AddWithValue("@FeesId", feeDetails.FeesId);
            sqlCommand.Parameters.AddWithValue("@Date", feeDetails.Date);

            sqlCommand.Parameters.AddWithValue("@Amount", feeDetails.Amount);
            sqlCommand.Parameters.AddWithValue("@Remarks", feeDetails.Remarks);
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
        public void EditFeesDetails(FeeDetails feeDetails)
        {
            SqlCommand sqlCommand = new SqlCommand("spFeesDetails", sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@Option", 'u');

            sqlCommand.Parameters.AddWithValue("@BatchId", feeDetails.BatchId);
            sqlCommand.Parameters.AddWithValue("@FeesId", feeDetails.FeesId);
            sqlCommand.Parameters.AddWithValue("@Date", feeDetails.Date);
            sqlCommand.Parameters.AddWithValue("@Amount", feeDetails.Amount);
            sqlCommand.Parameters.AddWithValue("@Remarks", feeDetails.Remarks);


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