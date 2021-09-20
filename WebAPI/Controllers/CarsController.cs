using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPI;
using WebAPI.CarData;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CarsController : ControllerBase
  {
    private ICarData _carData;

    public CarsController(ICarData carData)
    {
      _carData = carData;
    }

    [HttpPost]
    public IActionResult AddCar(Car car)
    {
      _carData.AddCar(car);
      return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + car.Id, car);
    }

    [HttpDelete("CarDetails")]
    public IActionResult DeleteCar(int id)
    {
      var car = _carData.GetCar(id);

      if (car != null)
      {
        _carData.DeleteCar(car);
        return Ok();
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpPut("CarDetails")]
    public IActionResult EditCar(int id, Car car)
    {
      var existingCar = _carData.GetCar(id);
      if (existingCar != null)
      {
        car.Id = existingCar.Id;
        return Ok(_carData.EditCar(car));
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpGet("GetAllCars")]
    public IActionResult GetCars()
    {
      return Ok(_carData.GetCars());
    }

    [HttpGet("CarDetails")]
    public IActionResult GetCar(int id)
    {
      var car = _carData.GetCar(id);

      if (car != null)
      {
        return Ok(car);
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpGet("Filter")]
    public IActionResult FilterCars(string manufacturer, string type, int year, int minPrice, int maxPrice, int minOdometer, int maxOdometer)
    {
      if (string.IsNullOrWhiteSpace(manufacturer)
                 && string.IsNullOrWhiteSpace(type) && year == 0 && minPrice == 0 && maxPrice == 0 && minOdometer == 0 && maxOdometer == 0)
      {
        return BadRequest();
      }
      return Ok(_carData.Filter(manufacturer, type, year, minPrice, maxPrice, minOdometer, maxOdometer));
    }

    [HttpGet("GetFilters")]
    public IActionResult GetFilters()
    {

      return Ok(_carData.GetFilters());
    }
  }
}
