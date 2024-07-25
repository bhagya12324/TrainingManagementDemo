namespace Domain
{
    public class Batch
    {
        public int BatchId { get; set; }
        public string BatchName { get; set; }


        public string StartDate { get; set; }

        public string TentativeEndDate { get; set; }
		public string EndDate { get; set; }
		public float Fees { get; set; }
        public float FeesPaid { get; set; }
        public float Duration { get; set; }
		public float HoursTaken { get; set; }
        public string Status { get; set; }
        public string Details { get; set; }
        public string Remarks { get; set; }



    }
}

							
							
							
							