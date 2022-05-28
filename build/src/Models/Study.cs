using System.ComponentModel.DataAnnotations;
namespace CRUDApp.Models;

public class Study
{
    [Key] public int Id { get; set; }
    public string Name { get; set; }
    public string Region { get; set; }
    public string Description { get; set; }
    [Display(Name = "Start Date")]
    public DateTime StartDate { get; set; }
    [Display(Name = "End Date")]
    public DateTime EndDate { get; set; }
}
