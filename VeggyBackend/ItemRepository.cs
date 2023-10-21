using Microsoft.EntityFrameworkCore;

namespace FreshVeggies
{
	public class ItemRepository : IItemRepository
	{	
		private readonly AppDbContext _context;
		public ItemRepository(AppDbContext context) 
		{
			_context = context;
		}

		public async Task<IEnumerable<Item>> GetAll() 
		{
			return await _context.Items.ToListAsync();
		}

		//Task<Item> GetById(int id);
		//Task<bool> Create(Item item);
		//Task<bool> Update(int id, Item item);
		//Task<bool> Delete(int id);

		public async Task<Item> GetById(int id)
		{
			return await  _context.Items.FindAsync(id);
			
		}

		public async Task<bool> Create(Item item)
		{
			_context.Items.Add(item);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<bool>Update(int id,Item item)
		{
			var finditem = await _context.Items.FindAsync(id);
			if (finditem != null)
			{
				finditem.name = item.name;
				finditem.image = item.image;
				finditem.type=item.type;
				finditem.price = item.price;
				
				await _context.SaveChangesAsync();
				return true;
			}
			return false;
		}

		
		public async Task<bool>Delete(int id)
		{
			var finditem = await _context.Items.FindAsync(id);
			if(finditem != null)
			{
				_context.Items.Remove(finditem);
				await _context.SaveChangesAsync();	
				return true;
			}
			return false;
		}
	}
}
