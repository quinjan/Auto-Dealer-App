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

    [HttpDelete("carDetails")]
    public IActionResult DeleteCar(int id)
    {
      var car = _carData.GetCar(id);

      if (car != null)
      {
        _carData.deleteCar(car);
        return Ok();
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpPut("carDetails")]
    public IActionResult EditCar(int id, Car car)
    {
      var existingCar = _carData.GetCar(id);
      if (existingCar != null)
      {
        car.Id = existingCar.Id;
        return Ok(_carData.editCar(car));
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpGet]
    public IActionResult GetCars()
    {
      return Ok(_carData.GetCars());
    }

    [HttpGet("carDetails")]
    public IActionResult GetCar(int id)
    {
      var car = _carData.GetCar(id);

      if (car != null)
      {
        return Ok(car);
      }
      return NotFound($"Car with Id: {id} was not found");
    }

    [HttpGet("filter")]
    public IActionResult filterCars(string manufacturer, string type, int year, int minPrice, int maxPrice, int minOdometer, int maxOdometer)
    {
      if (string.IsNullOrWhiteSpace(manufacturer)
                 && string.IsNullOrWhiteSpace(type) && year == 0 && minPrice == 0 && maxPrice == 0 && minOdometer == 0 && maxOdometer == 0)
      {
        return BadRequest();
      }
      return Ok(_carData.filter(manufacturer, type, year, minPrice, maxPrice, minOdometer, maxOdometer));
    }

    [HttpGet("getFilters")]
    public IActionResult getFilters()
    {

      return Ok(_carData.getFilters());
    }
  }
}
