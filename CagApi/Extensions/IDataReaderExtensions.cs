using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace CagApi.Extensions
{
    public static class IDataReaderExtensions
    {
        public static T Field<T>(this IDataReader reader, string field)
        {
            object obj = reader[field];
            if(obj == DBNull.Value)
            {
                return default(T);
            }
            return (T)obj;
        }

        public static string GetStringField(this IDataReader reader,string field, bool trim, bool intern)
        {
            object obj = reader[field];
            if (obj == DBNull.Value)
            {
                return null;
            }

            string str = obj as string;

            if(str != null)
            {
                string trimmed = str;
                if(trim)
                {
                    trimmed = str.Trim();
                }

                if(intern)
                {
                    return String.Intern(trimmed);
                }
            }
            return str;
        }

    }
}