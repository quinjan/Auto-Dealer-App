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

    void deleteCar(Car car);

    Car editCar(Car car);

    List<Car> filter(string manufacturer, string type, int year, int minPrice, int maxPrice, int minOdometer, int maxOdometer);

    CarFilter getFilters();
  }
}
