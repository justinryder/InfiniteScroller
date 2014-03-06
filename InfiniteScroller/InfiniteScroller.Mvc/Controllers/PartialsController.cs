using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace InfiniteScroller.Mvc.Controllers
{
  public class PartialsController : Controller
  {
    public ActionResult Game()
    {
      return View();
    }

    public ActionResult MainMenu()
    {
      return View();
    }
  }
}