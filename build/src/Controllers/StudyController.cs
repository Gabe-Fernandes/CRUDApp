using CRUDApp.Data;
using CRUDApp.Models;
using Microsoft.AspNetCore.Mvc;
namespace CRUDApp.Controllers;

public class StudyController : Controller
{
    private readonly ApplicationDbContext _db;

    public StudyController(ApplicationDbContext db)
    {
        _db = db;
    }

    private IEnumerable<Study> ObjStudyList() { return _db.Studies; }

    public IActionResult CTMS()
    {
        ViewData["Studies"] = ObjStudyList();
        return View();
    }

    public IActionResult Create()
    {
        ViewData["Studies"] = ObjStudyList();
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Study obj)
    {
        if (obj.StartDate > obj.EndDate)
        {
            ModelState.AddModelError("EndDate", "*the end date must be after the start date*");
        }

        if (ModelState.IsValid)
        {
            _db.Studies.Add(obj);
            _db.SaveChanges();
            return RedirectToAction("CTMS");
        }
        ViewData["Studies"] = ObjStudyList();
        return View(obj);
    }

    public IActionResult Edit(int? id)
    {
        if (id == null || id == 0) { return NotFound(); }

        var studyFromDb = _db.Studies.Find(id);

        if (studyFromDb == null) { return NotFound(); }

        ViewData["Studies"] = ObjStudyList();
        return View(studyFromDb);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(Study obj)
    {
        if (obj.StartDate > obj.EndDate)
        {
            ModelState.AddModelError("EndDate", "*the end date must be after the start date*");
        }

        if (ModelState.IsValid)
        {
            _db.Studies.Update(obj);
            _db.SaveChanges();
            return RedirectToAction("CTMS");
        }

        ViewData["Studies"] = ObjStudyList();
        return View(obj);
    }

    public IActionResult Delete(int? id)
    {
        if (id == null || id == 0) { return NotFound(); }

        var studyFromDb = _db.Studies.Find(id);

        if (studyFromDb == null) { return NotFound(); }

        ViewData["Studies"] = ObjStudyList();
        return View(studyFromDb);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeletePOST(int? id)
    {
        var studyToDelete = _db.Studies.Find(id);
        if (studyToDelete == null) { return NotFound(); }

        _db.Studies.Remove(studyToDelete);
        _db.SaveChanges();
        return RedirectToAction("CTMS");
    }
}
