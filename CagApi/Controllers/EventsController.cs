using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CagApi.Models;
using System.Data.SqlClient;
using System.Configuration;
using CagApi.Extensions;

namespace CagApi.Controllers
{
    [RoutePrefix("cagApi")]
    public class EventsController : ApiController
    {
        public EventsController()
        {

        }

        [HttpPost]
        [Route("events")]
        public List<Event> GetAllEvents()
        {
            GetEventsFromDb();
            return null;
        }

        private List<Event> GetEventsFromDb()
        {
            List<Event> events = new List<Event>();
            using (SqlConnection connection =
                new SqlConnection(ConfigurationManager.ConnectionStrings["CAG"].ConnectionString))
            {
                connection.Open();
                using (SqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = "SELECT * FROM [dbo].[Events]";
                    cmd.CommandTimeout = 30;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            Event newEvent = new Event();
                            var id = reader.Field<int>("Id");
                            var title = reader.Field<string>("Title");
                            var detailDescription = reader.Field<string>("DetailDescription");
                            var fromDate = reader.Field<string>("StartDate");
                            var toDate = reader.Field<string>("EndDate");
                            var location = reader.Field<string>("Location");
                            var image = reader.Field<string>("Image");
                            var startTime = reader.Field<string>("StartTime");
                            var endTime = reader.Field<string>("EndTime");
                            var additionalTopic1 = reader.Field<string>("AdditionalTopic1");
                            var additionalDescription1 = reader.Field<string>("AdditionalDescription1");
                            var additionalTopic2 = reader.Field<string>("AdditionalTopic2");
                            var additionalDescription2 = reader.Field<string>("AdditionalDescription2");

                            events.Add(newEvent);
                        }
                    }

                }
            }
            return events;
        }
    }
}
