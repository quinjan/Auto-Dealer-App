using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
  public class CarFilter
  {
    public List<string> Manufacturer { get; set; }

    public List<string> Type { get; set; }
  }
}
