﻿using backendPetHome.DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backendPetHome.DAL.Models
{
    public class Advert
    {
        public int Id { get; set; }
        public string name { get; set; } = string.Empty;
        public int cost { get; set; }
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public string description { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string ownerId { get; set; } = string.Empty;
        public User owner { get; set; }
        public string? performerId { get; set; }
        public User? performer { get; set; }
        public List<Request>? requests { get; set; }
    }
}
