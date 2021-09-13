using System;
using System.Collections.Generic;
using System.Text;
using WebAPI.Controllers;
using WebAPI.CarData;
using WebAPI.Models;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;

namespace UnitTest
{
  [TestClass]
  public class CarsControllerTest
  {
    public Mock<ICarData> _mockCarData;
    public Mock<CarsController> _controller;
    public Mock<CarContext> _mockCarContext;

    [TestInitialize]
    public void TestInitialize()
    {
      _mockCarContext = new Mock<CarContext>();
      _mockCarData = new Mock<ICarData>(_mockCarContext);
      _controller = new Mock<CarsController>(_mockCarData);
    }

    [TestMethod]
    public void GetCar()
    {
      var carDTO = new Car();

      carDTO = _mockCarData.Object.GetCar(2);
      var result = _controller.Object.GetCar(2);
      var okObjectResult = result as OkObjectResult;
      var car = okObjectResult.Value as Car;
      Assert.IsTrue(car.Equals(carDTO));
    }
  }
}
