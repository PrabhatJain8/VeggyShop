using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace FreshVeggies
{
	public interface IItemRepository
	{
		Task<IEnumerable<Item>> GetAll();
		Task<Item> GetById(int id);
		Task<bool> Create(Item item);
		Task<bool> Update(int id, Item item);
		Task<bool> Delete(int id);
	}
}
