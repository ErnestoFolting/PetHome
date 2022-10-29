using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public  class Advert
    {
        public enum advertStatusEnum
        {
            search = 0,
            process = 1,
            finished = 2,
        }
        public int id { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        public string location{ get; set; }
        public string description { get; set; }
        public advertStatusEnum status { get; set; }
        public DateTime startTime{ get; set; }
        public DateTime endTime{ get; set; }
        public string ownerId { get; set; }
        public User owner { get; set; }
        public string? performerId { get; set; }
        public User? performer { get; set; }
        public IEnumerable<Request>? requests { get; set; }
    }
}
