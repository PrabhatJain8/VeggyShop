using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace FreshVeggies.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ItemController : Controller
	{
		private readonly IItemRepository _itemRepository;
		private readonly AppDbContext _dbContext;
		public ItemController(IItemRepository itemRepository)
		{
			_itemRepository= itemRepository;
		}

		//[Authorize]
		[HttpGet]
		public async Task<IEnumerable<Item>> GetAllItems()
		{

			return await _itemRepository.GetAll();
		}

		[HttpGet("{id}")]
		public async Task<IActionResult>GetItemById(int id)
		{
			var item = await _itemRepository.GetById(id);
			if(item == null)
			{
				return NotFound();
			}
			return Ok(item);
		}
		[Authorize(Roles ="Admin")]
		[HttpPost]
		public async Task<IActionResult>Create([FromBody] Item item)
		{
			var IsCreated = await _itemRepository.Create(item);
			return Ok(item);
		}

		[Authorize(Roles = "Admin")]
		[HttpPut("{id}")]
		public async Task<IActionResult>Update(int id, [FromBody] Item i)
		{
			var IsUpdated = await _itemRepository.Update(id, i);
			if (IsUpdated == false)
			{
				return BadRequest("Unable to Update");
			}
			return Ok(i);
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete("{id}")]
		public async Task<IActionResult>Delete(int id)
		{
			var IsDeleted = await _itemRepository.Delete(id);
			if (IsDeleted == false)
			{
				return BadRequest("Unable to Delete");
			}
			return NoContent();
		}








	}
}
