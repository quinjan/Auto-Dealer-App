using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.CarData
{
  public interface ICarData
  {
    List<Car> GetCars();

    Car GetCar(int id);

    Car AddCar(Car car);

    void DeleteCar(Car car);

    Car EditCar(Car car);

    List<Car> Filter(string manufacturer, string type, int year, int minPrice, int maxPrice, int minOdometer, int maxOdometer);

    CarFilter GetFilters();
  }
}
