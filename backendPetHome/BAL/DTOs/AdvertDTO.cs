﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.BLL.DTOs
{
    public class AdvertDTO
    {
        public string name { get; set; }
        public int cost { get; set; }
        public string location { get; set; }
        public string description { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
    }
}