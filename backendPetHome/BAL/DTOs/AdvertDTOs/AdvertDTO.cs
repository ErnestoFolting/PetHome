﻿using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public string description { get; set; } = string.Empty;
        public string? photoFilePath { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; } = AdvertStatusEnum.search;
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public UserDTO? owner { get; set; } //make some DTOs
        public string?  ownerId { get; set; }
    }
}