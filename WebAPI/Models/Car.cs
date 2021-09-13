using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
  public class Car
  {
    [Key]
    public int Id { get; set; }

    public string Manufacturer { get; set; }

    public string Model { get; set; }

    public int Year { get; set; }

    public int Odometer { get; set; }

    public string Type { get; set; }

    public int Price { get; set; }

    public string Transmission { get; set; }

    public string Color { get; set; }

    public string Fuel { get; set; }

    public string Address { get; set; }

    public string City { get; set; }

    public string ImageUrl { get; set; }
  }
}
