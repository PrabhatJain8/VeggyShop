using Microsoft.EntityFrameworkCore;

namespace FreshVeggies
{
	public class CartRepository : ICartRepository
	{
		private readonly AppDbContext _repository;
		public CartRepository(AppDbContext repository)
		{
			_repository= repository;
		}

		public async Task<bool> AddToCart(Cart cart)
		{
			var itemPresent = _repository.Carts.FirstOrDefault(x => x.userName == cart.userName && x.itemName == cart.itemName);
			if(itemPresent == null)
			{
				_repository.Carts.Add(cart);
				
			}
			else
			{
				itemPresent.quantity += 1;
			}
			//var allItems = _repository.Carts.Where(x =>x.userName==cart.userName).ToList(); 
			//foreach(var item in allItems)
			//{
			//	cart.subtotal += item.quantity*item.price;
			//}
			await _repository.SaveChangesAsync();
			return true;
		} 

		public async Task<bool> RemoveFromCart(int id)
		{
			var item = await _repository.Carts.FindAsync(id);
			if(item != null)
			{
				_repository.Carts.Remove(item);
				await _repository.SaveChangesAsync();
				return true;
			}
			return false;
		}

		public async Task<List<Cart>> GetMyCart(string user)
		{
			return await _repository.Carts.Where(x=>x.userName == user).ToListAsync();
		}

		public async Task<int> GetTotalItems(string user)
		{
			int count = 0;
			var items = await _repository.Carts.Where(x => x.userName == user).ToListAsync();
			if (items != null)
			{
				foreach (var item in items)
				{
					count += item.quantity;
				}
			}
			return count;
		}

		public async Task<bool>ConfirmOrder(string user)
		{
			var items = await _repository.Carts.Where(x => x.userName == user).ToListAsync();
			foreach(var item in items)
			{
				_repository.Carts.Remove(item);
			}
			await _repository.SaveChangesAsync();
			return true;
		}

		public async  Task<int> GetTotal(string user)
		{
			var total = 0;
			var allItems = await _repository.Carts.Where(x => x.userName == user).ToListAsync();
			foreach (var item in allItems)
			{
				total+= item.quantity * item.price;
			}
			return total;

		}

		public async Task<bool>Update(int id,Cart cart)
		{
			var findcart= _repository.Carts.FirstOrDefault(x=>x.id==id && x.userName==cart.userName);
			if(findcart!=null && cart.quantity>0)
			{
				findcart.quantity = cart.quantity;
				await _repository.SaveChangesAsync();
				return true;
			}
			return false;
		}

	}
}
