using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CagApi.Models
{
    public class Event
    {
        public string Title {get;set;}

        public string Description { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string Location { get; set; }

        public string Image { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public string AdditionalInfoTopic { get; set; }

        public string AdditionalInfoDescription { get; set; }
    }
}