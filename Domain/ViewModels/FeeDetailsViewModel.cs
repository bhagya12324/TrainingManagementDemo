﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class FeeDetailsViewModel
    {
        public int FeesId { get; set; }
        public int BatchId { get; set; }
        public string BatchName { get; set; }
        public string Date { get; set; }
        public float Amount { get; set; }
        public string Remarks { get; set; }
    }
}
