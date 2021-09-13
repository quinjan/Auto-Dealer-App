using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.CarData
{
  public class SqlCarData : ICarData
  {
    private CarContext _carContext;
    public SqlCarData(CarContext carContext)
    {
      _carContext = carContext;
    }

    public Car AddCar(Car car)
    {
      _carContext.Cars.Add(car);
      _carContext.SaveChanges();
      return car;
    }

    public void deleteCar(Car car)
    {
      _carContext.Cars.Remove(car);
      _carContext.SaveChanges();
    }

    public Car editCar(Car car)
    {
      var exsistingCar = _carContext.Cars.Find(car.Id); //where
      if (exsistingCar != null)
      {
        exsistingCar.Manufacturer = car.Manufacturer;
        exsistingCar.Model = car.Model;
        exsistingCar.Year = car.Year;
        exsistingCar.Odometer = car.Odometer;
        exsistingCar.Type = car.Type;
        exsistingCar.Price= car.Price;
        _carContext.Cars.Update(exsistingCar);
        _carContext.SaveChanges();
      }
      return car;
    }

    public Car GetCar(int id)
    {
      return _carContext.Cars.SingleOrDefault(x => x.Id == id);
    }

    public List<Car> GetCars()
    {
      return _carContext.Cars.ToList();
    }

    public List<Car> filter(string manufacturer, string type, int year, int minPrice, int maxPrice, int minOdometer, int maxOdometer)
    {
      var collection = _carContext.Cars as IQueryable<Car>;

      if (!string.IsNullOrWhiteSpace(manufacturer))
      {
        collection = collection.Where(x => x.Manufacturer == manufacturer);
      }

      if (!string.IsNullOrWhiteSpace(type))
      {
        collection = collection.Where(x => x.Type == type);
      }

      if (year != 0)
      {
        collection = collection.Where(x => x.Year == year);
      }

      if (minPrice != 0 && maxPrice != 0)
      {
        collection = collection.Where(x => x.Price >= minPrice && x.Price <= maxPrice);
      }

      if (minOdometer != 0 && maxOdometer != 0)
      {
        collection = collection.Where(x => x.Odometer >= minOdometer && x.Odometer <= maxOdometer);
      }


      return collection.ToList();
    }

    public CarFilter getFilters()
    {
      var collection = new CarFilter();
      collection.Manufacturer = _carContext.Cars.Select(x => x.Manufacturer).Distinct().ToList();
      collection.Type = _carContext.Cars.Select(x => x.Type).Distinct().ToList();

      return collection;
    }


  }
}
